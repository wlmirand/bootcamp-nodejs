/**
 * Modulo para tratar a conexao com o DB
 */
const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

//retornaremos o objeto do DB
let db = null;

module.exports = (app) => {
    if (!db) {

        const DbConfig = app.libs.config;

        //cria a conexao com o sequelize
        const sequelize = new Sequelize(DbConfig);

        //cria o objeto que contem coisas do sequelize
        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname + '/../', 'model');

        console.log(dir)

        //le a pasta dos modelos, para criar os objetos no Sequelize de forma automatica
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        //para cada "entidade" chama a funcao associate para fazer o "ALTER"
        //e declarar as chaves estrangeiras e fazer os mapeamentos/associacoes
        Object.keys(db.models).forEach(key => {
            if (db.models[key].hasOwnProperty('associate')) {
                db.models[key].associate(db.models);
            }
        });
    }

    return db;
}