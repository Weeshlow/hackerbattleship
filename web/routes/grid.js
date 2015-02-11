var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended:false });

router.route('/') // root is relative to the route mountpoint
    .get (function(request, response) {
      response.status(200).json('OK');
    });

module.exports = router;
