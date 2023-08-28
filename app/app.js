const express = require('express');
const bodyParser = require('body-parser');

const authController = require('../controller/authController');
const movieController = require('../controller/movieController');
const tableController = require('../controller/tableController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header( "Access-Control-Allow-Headers", "Orgigin, X-Requested-With, Content-Type, Accept");
    res.header( "Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/auth', authController);
app.use('/movie', movieController);
app.use('/table', tableController);

app.get('/',(req, res, next) => {
    res.status(200).json("Classified");
});

module.exports = app;