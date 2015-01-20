var request = require('supertest');
var app = require('../app');

describe('Requests to the app root', function() {

  it('Should return status code 200', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Should return HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  });

});
