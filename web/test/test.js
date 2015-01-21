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

describe('Requests to /rules.html', function() {
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

describe('Requests to /api/grid', function() {
  it('Should return status code 200', function(done) {
    request(app)
      .get('/api/grid')
      .expect(200, done);
  });

  it('Should return JSON format', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/, done);
  });
});
