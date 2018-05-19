//Importa o modulo do Express
const express = require('express');
const consign = require('consign');

//Instancia o componente
const app = express();

consign()
    .include('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);