//importa somente oq precisa do validator
const { body, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

//Criamos um modulo para as rotas e, o consign ira fazer a injecao de dependencia
//no caso, ele passa para nos a instancia do express.... na variavel app
module.exports = (app) => {
    
    //Usamos a estrutura que retornamos no db.js para acessar os modelos do Sequelize
    const Tasks = app.libs.db.models.Tasks;

    /*Como temos o mesmo endpoint para GET/POST/... podemos usar route para nao repetir
        app.get  app.put no mesmo endpoint */
    app.route('/tasks')
        .get((req, res) => {
            Tasks.findAll()
                .then( (result) => {
                    res.json(result);
                })
                .catch( (error) => {
                    res.status(500).json(error);
                })
        })
        .post([
                body('title', 'Required field').exists(),
                body('title', 'Invalid length').trim().isLength({ min: 1, max: 50 })
            ],
            (req, res) => {

                const validationErrors = validationResult(req);

                if (!validationErrors.isEmpty()) {
                    return res.status(400).json(validationErrors.array())
                }

                /*
                    Ao inves de chamar diretamente
                    Tasks.create(req.body)
                    podemos usar matchedData(req) onde o validator retorna
                    somente o que foi validado, ignorando quaisquer valores nao validados
                */
                Tasks.create(matchedData(req))
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