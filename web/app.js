var express = require('express');
//var path = require('path');
var app = express()

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');

// include the /user routing
var user = require('./routes/user');
app.use('/user', user);

// serve content from the root
app.get('/rules', function(reqest, response) {
  response.sendFile('/rules.html', {'root': __dirname + '/public'} );
});

module.exports = app;
