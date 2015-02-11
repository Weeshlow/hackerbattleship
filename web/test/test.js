var request = require('supertest');
var app = require('../app');

// Test the home page
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

  it('Should return a file with "hacker battleship" in it', function(done) {
    request(app)
      .get('/')
      .expect(/hacker battleship/i, done);
  });
});

// Test the rules page
describe('Requests to /rules', function() {
  it('Should return status code 200', function(done) {
    request(app)
      .get('/rules')
      .expect(200, done);
  });

  it('Should return HTML format', function(done) {
    request(app)
      .get('/rules')
      .expect('Content-Type', /html/, done);
  });
});

// Test the user page
describe('Requests to the user page', function(){
  it('Should return status code 200', function(done){
    request(app)
      .get('/user')
      .expect(200, done);
  });

  it('Should return HTML format', function(done) {
    request(app)
      .get('/user')
      .expect('Content-Type', /html/, done);
  });
});

// Test the registration form
describe('Requests to the registration form', function() {
  it('Should return status code 200', function(done) {
    request(app)
      .get('/user/register')
      .expect(200, done);
  });

  it('Should return HTML format', function(done) {
    request(app)
      .get('/user/register')
      .expect('Content-Type', /html/, done);
  });

  it('Should return a file with the registration form in it', function(done) {
    request(app)
      .get('/user/register')
      .expect(/form name="reg"/i, done);
  });
});

// Test the grid api
describe('Requests to /grid', function() {
  it('Should return status code 200', function(done) {
    request(app)
      .get('/grid')
      .expect(200, done);
  });

  it('Should return JSON format', function(done) {
    request(app)
      .get('/grid')
      .expect('Content-Type', /json/, done);
  });
});
