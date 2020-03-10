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

var app = new Vue({
    el: "#app",
    data: {
        test: '',
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/20/2020', name: 'Conta de luz', value: 130.99, done: true},
            {date_due: '20/20/2020', name: 'Conta de água', value: 70, done: true},
            {date_due: '20/20/2020', name: 'Conta de telefone', value: 140, done: false},
            {date_due: '20/20/2020', name: 'Supermercado', value: 240.35, done: false},
            {date_due: '20/20/2020', name: 'Empréstimo', value: 0, done: false},
            {date_due: '20/20/2020', name: 'Gasolina', value: 250.99, done: false}
        ]
    },
    computed: {
        status: function () {
            if (!this.bills.length) {
                return false;
            }

            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id === 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {
            if (confirm('Deseja excluir?')) {
                this.bills.$remove(bill);
            }
        }
    }
});

/*
app.$watch('test', function (novoValor, velhoValor) {
    console.log(velhoValor);
    console.log(novoValor);
});
*/