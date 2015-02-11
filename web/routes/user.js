var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended:false });

router.route('/') // root is relative to the route mountpoint
    .get (function(request, response) {
      response.status(200).send('OK');
    });

router.route('/register')
    .get (function(request, response) {
      response.status(200).send('OK');
    })

    .post(parseUrlencoded, function(request, response) {
    var newUser = request.body;
    var username = newUser.username;
    response.status(201).json(username);
  });

module.exports = router;
