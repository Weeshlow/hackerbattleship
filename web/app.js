var express = require('express');
var app = express()

app.use(express.static('public'));
app.disable('x-powered-by');

app.get('/', function(request, response) {
//   throw 'Error';
  response.status(200).json('OK');
});

// include the /users routing
var users = require('./routes/users');
app.use('/users', users);

module.exports = app;
