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
  // Values to be used for the following tests:
  let name = `RJ Test ID:${Date.now()}`
  let goal = "enlightenment"
  let oldName = "4ca683c9-5cac-4a41-86b3-20125c01fd3d"
  let oldGoal = "employment"

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

  it('is in state of greetings: returns a greeting', function(done) {
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


  it('is in state of nameLookup: asks for goal when name not recognized and state', function(done) {
    request.post('/messages')
      .send({ aasm_state: "nameLookup",
        input: name
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.eql({
          message: `Hi, ${name} Whats one thing you want to work on?`,
          nextState: "goalLookup",
          name: name
        });
      done(err);
    });
  });

  it('is in state of nameLookup: confirms old goal when name is recognized and state', function(done) {
    request.post('/messages')
      .send({ aasm_state: "nameLookup",
        input: oldName
      })
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
          message: `Hi ${oldName}! Welcome back! you said before you wanted to work on: ${oldGoal}. What do you want to work on now?`,
          nextState: "goalLookup",
          name: oldName,
          goal: oldGoal
        });
      done(err);
    });
  });


  it('is in state of goalLookup: confirm what goal user wants to work on', function(done) {
    request.post('/messages')
      .send({ aasm_state: "goalLookup",
        input: goal,
        name: name
      })
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
          message: `So you want to work on ${goal}. Does that sound right, ${name}?`,
          nextState: "confirmGoal",
          name: name,
          goal: goal
        });
      done(err);
    });
  });


  it('is in state of confirmGoal: if a false-y value is submitted as input returns to goalLookup', function(done) {
    request.post('/messages')
      .send({ aasm_state: "confirmGoal",
        input: "no",
        name: name
      })
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
          message: `No problem, ${name}! Let's try again. What's one thing you want to work on?`,
          name: name,
          nextState: "goalLookup"
        });
      done(err);
    });
  });

  it('is in state of confirmGoal: if a true-y value is submitted as input creates user row and pulls data from shine api', function(done) {
    request.post('/messages')
      .send({ aasm_state: "confirmGoal",
        input: "yes",
        name: name,
        goal: goal
      })
      .expect(200)
      .end(function(err, res) {
        // eval(pry.it)
        expect(res.body).to.eql({
        message: "Great! Heres a daily dose of Shine to get you started http://daily.shinetext.com/2017-03-21",
        name: name,
        goal: goal,
        nextState: "complete"
      });
      done(err);
    });
  });
});