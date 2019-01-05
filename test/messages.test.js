var { Greeter } = require('../models/greeter')
var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../app.js');
var pry = require('pryjs')

global.app = app;  
global.uuid = uuid;  
global.expect = chai.expect;  
global.request = supertest(app);  





// In this test it's expected to return the basic message
describe('GET /messages', function() {
  it('returns you must "post" a request', function(done) {
    request.get('/messages')
      .expect(200)
      .end(function(err, res) {
        expect(res.text).to.eq('you must "post" a request');
        done(err);
      });
  });
});


// In this test it's expected to return the basic message
describe('POSTS /messages', function() {
  it('returns confused state when no data is sent', function(done) {
    request.post('/messages')
      .send({})
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
          message: 'I got confused lets start over. Whats your name?',
          nextState: 'nameLookup' });
      done(err);
    });
  });

  it('returns a greeting', function(done) {
    request.post('/messages')
      .send({ aasm_state: "greetings" })
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
          message: (new Greeter).speak(),
          nextState: "nameLookup"
        });
      done(err);
    });
  });
});