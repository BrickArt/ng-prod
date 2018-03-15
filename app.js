const express = require('express');
const app = express();
global.__root = __dirname + '/';

const mongoose = require('./src/lib/mongoose')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Setup express
app.disable("x-powered-by");



// Add headers
const setHeaders = require(__root + 'src/middleware/setHeaders');
app.use(setHeaders);



//routes
app.get('/api', function (req, res) {
    res.status(200).send('API works.');
});

var UserController = require(__root + 'src/router/user/user.controller');
app.use('/', UserController);

var BillController = require(__root + 'src/router/bill/bill.controller');
app.use('/', BillController);

var CategoryController = require(__root + 'src/router/category/category.controller');
app.use('/', CategoryController);

var EventController = require(__root + 'src/router/event/event.controller');
app.use('/', EventController);

// var AuthController = require(__root + 'src/router/auth/auth.controller');
// app.use('/api', AuthController);



app.use(express.static(__root + 'public'));



module.exports = app;