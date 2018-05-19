/**
 * Modulo que define os interceptadores
 **/
const bodyParser = require('body-parser')

module.exports = (app) => {
    app.set('port', 8080);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {//remove qualquer id passado no body, pra nao cagar os insert/updates, que sao mantidos pelo banco
        delete req.body.id;
        next();
    });
}