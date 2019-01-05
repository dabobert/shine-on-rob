const { Greeter } = require('../models/greeter')
const chai = require('chai');  
global.expect = chai.expect;  
var pry = require('pryjs')



describe('Greeter', function() {
  describe('#speak()', function() {
    it('should say Good { morning | afternoon | evening }. What is your name?', function() {
      greeting = (new Greeter()).speak()
      let hour = (new Date()).getHours();
      if (hour <= 12)
        expect(greeting).to.eq("Good morning. What is your name?")
      else if (hour >= 18)
        expect(greeting).to.eq("Good evening. What is your name?")
      else
        expect(greeting).to.eq("Good afternoon. What is your name?")
    });
  });
});