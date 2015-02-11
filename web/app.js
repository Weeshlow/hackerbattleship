var express = require('express');
//var path = require('path');
var app = express()

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');

// include the user pages
var user = require('./routes/user');
app.use('/user', user);

// include the grid API routing
var grid = require('./routes/grid');
app.use('/grid', grid);

// serve content from the app root
app.get('/rules', function(reqest, response) {
  response.sendFile('/rules.html', {'root': __dirname + '/public'} );
});

module.exports = app;
