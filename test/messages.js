var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../app.js');
var pry = require('pryjs')

global.app = app;  
global.uuid = uuid;  
global.expect = chai.expect;  
global.request = supertest(app);  





// In this test it's expected a task list of two tasks
describe('GET /messages', function() {
  it('returns a message', function(done) {
    request.get('/messages')
      .expect(200)
      .end(function(err, res) {
        expect(res.text).to.eq('you must "post" a request');
        done(err);
      });
  });
});