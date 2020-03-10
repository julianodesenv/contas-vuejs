var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
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
    }
});

