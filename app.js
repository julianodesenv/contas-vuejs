var app = new Vue({
    el: "#app",
    data: {
        test: '',
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 1,
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
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
            {date_due: '20/20/2020', name: 'Conta de luz', value: 130.99, done: 1},
            {date_due: '20/20/2020', name: 'Conta de água', value: 70, done: 1},
            {date_due: '20/20/2020', name: 'Conta de telefone', value: 140, done: 0},
            {date_due: '20/20/2020', name: 'Supermercado', value: 240.35, done: 0},
            {date_due: '20/20/2020', name: 'Empréstimo', value: 0, done: 0},
            {date_due: '20/20/2020', name: 'Gasolina', value: 250.99, done: 0}
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return !count ? "Nehuma conta a pagar" : "Existem " + count + " a serem pagas";
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
        },
        submit: function () {
            this.bills.push(this.bill);
            this.activedView = 0;
        }
    }
});

app.$watch('test', function (novoValor, velhoValor) {
    console.log(velhoValor);
    console.log(novoValor);
});



