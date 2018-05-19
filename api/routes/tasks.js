//Criamos um modulo para as rotas e, o consign ira fazer a injecao de dependencia
//no caso, ele passa para nos a instancia do express.... na variavel app
module.exports = (app) => {
    
    //Usamos a estrutura que retornamos no db.js para acessar os modelos do Sequelize
    const Tasks = app.libs.db.models.Tasks;

    /*Como temos o mesmo endpoint para GET/POST/... podemos usar route para nao repetir
        app.get  app.put no mesmo endpoint */
    app.route('/tasks')
        //remove qualquer id passado no body, pra nao cagar os insert/updates, que sao mantidos pelo banco
        /*
        .all((req, res, next) => {
            delete req.body.id;
            next();
        })
        */
        .get((req, res) => {
            Tasks.findAll()
                .then( (result) => {
                    res.json(result);
                })
                .catch( (error) => {
                    res.status(500).json(error);
                })
        })
        .post((req, res) => {
            Tasks.create(req.body)
                .then( (result) => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        });

    app.route('/tasks/:id')
        .get((req, res) => {
            Tasks.findById(req.params.id)
                .then(result => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .put((req, res) => {
            Tasks.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        })
        .delete((req, res) => {
            Tasks.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        });
}