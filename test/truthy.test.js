const { Truthy } = require('../models/truthy')
const chai = require('chai');  
global.expect = chai.expect;  
var pry = require('pryjs')



describe('Truthy', function() {
  describe('#value()', function() {
    it('returns true for all values defined in likeTrue', function() {
      (new Truthy("testing")).likeTrue.forEach((truish) => {
        expect((new Truthy(truish)).value()).to.equal(true)
      });
    });

    it('returns true for all values defined in likeFalse', function() {
      (new Truthy("testing")).likeFalse.forEach((falsish) => {
        expect((new Truthy(falsish)).value()).to.equal(false)
      });
    });
  });
});