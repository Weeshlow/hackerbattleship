var express = require('express');
var app = express()

app.get('/', function(request, response) {
//   throw 'Error';
  response.status(200).json('OK');
});

module.exports = app;
