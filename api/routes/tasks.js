//Criamos um modulo para as rotas e, o consign ira fazer a injecao de dependencia
//no caso, ele passa para nos a instancia do express.... na variavel app
module.exports = (app) => {
    
    app.get('/tasks', (req, res) => {
        res.json({
            status: 'Teste porra'
        });
    });
}