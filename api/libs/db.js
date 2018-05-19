/**
 * Modulo para tratar a conexao com o DB
 */
const Sequelize = require('sequelize');
const DbConfig = require('./config');

//retornaremos o objeto do DB
let db = null;

module.exports = (app) => {
    if (!db) {

        //cria a conexao com o sequelize
        const sequelize = new Sequelize(DbConfig);

        //cria o objeto que contem coisas do sequelize
        db = {
            sequelize,
            Sequelize,
            model: {}
        };
    }

    return db;
}