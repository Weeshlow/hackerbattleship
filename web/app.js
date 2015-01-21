var express = require('express');
var app = express()

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');

// include the /users routing
var users = require('./routes/users');
app.use('/users', users);

module.exports = app;
