//Importa o modulo do Express
const express = require('express');
const consign = require('consign');

//Instancia o componente
const app = express();

//instancia os modulos na ordem correta
consign()
    .include('libs/db.js')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js') //no final, roda o app com o "listen"
    .into(app);