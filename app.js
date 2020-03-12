Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    } else {
        return "Paga";
    }
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + value + " conta(s) a serem pagas";
    }

});

var menuComponent = Vue.extend({
    template: `
        <ul class="nav">
            <li class="nav-item" v-for="o in menus">
                <a class="nav-link" href="#" @click.prevent="showView(o.id)">{{ o.name}}</a>
            </li>
        </ul>`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ]
        };
    },
    methods: {
        showView: function (id) {
            this.$root.$children[0].activedView = id;
            if (id === 1) {
                this.$root.$children[0].formType = 'insert';
            }
        }
    }
});

var billListComponent = Vue.extend({
    template: `
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index, o) in bills">
                <td>{{ index }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'bg-success': o.done, 'bg-danger': !o.done}">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>`,
    data: function () {
        return {
            bills: [
                {date_due: '20/20/2020', name: 'Conta de luz', value: 130.99, done: true},
                {date_due: '20/20/2020', name: 'Conta de água', value: 70, done: true},
                {date_due: '20/20/2020', name: 'Conta de telefone', value: 140, done: false},
                {date_due: '20/20/2020', name: 'Supermercado', value: 240.35, done: false},
                {date_due: '20/20/2020', name: 'Empréstimo', value: 0, done: false},
                {date_due: '20/20/2020', name: 'Gasolina', value: 250.99, done: false}
            ]
        };
    },
    methods: {
        loadBill: function (bill) {
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update';
        },
        deleteBill: function (bill) {
            if (confirm('Deseja excluir?')) {
                this.bills.$remove(bill);
            }
        }
    }
});

var billCriateComponent = Vue.extend({
    template: `
        <form name="form" class="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due">
            <br/><br/>
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o">{{ o }}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="text" v-model="bill.value">
            <br/><br/>
            <label>Pago?</label>
            <input type="checkbox" v-model="bill.done">
            <br/><br/>
            <input type="submit" value="Enviar"/>
        </form>`,
    data: function () {
        return {
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Empréstimo',
                'Gasolina'
            ]
        };
    },
    props: ['bill', 'formType'],
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$parent.$refs.billListComponent.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.$parent.activedView = 0;
        }
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCriateComponent
    },
    template: `
        <div class="container">
            <h1>{{ title }}</h1>
            <hr/>
            <h3 :class="{'text-info': status === false, 'text-success': status === 0, 'text-danger': status > 0}">{{ status | statusGeneral }}</h3>

            <menu-component></menu-component>

            <div class="row">
                <div class="col-md-12" v-show="activedView == 0">
                    <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div class="col-md-12" v-show="activedView == 1">
                    <bill-create-component :bill.sync="bill" :form-type="formType"></bill-create-component>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            test: '',
            title: "Contas a pagar",
            activedView: 0,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length) {
                return false;
            }

            var count = 0;
            for (var i in billListComponent.bills) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {}
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: "#app"
});

/*
app.$watch('test', function (novoValor, velhoValor) {
    console.log(velhoValor);
    console.log(novoValor);
});
*/