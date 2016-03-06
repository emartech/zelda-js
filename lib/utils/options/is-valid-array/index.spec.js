'use strict';

const isValidArray = require('./');

describe('Utilities', function() {

  describe('#isValidArray', function() {

    it('should return true when undefined given', function() {
      this.expect(isValidArray()).to.be.true;
    });

    it('should return true when null given', function() {
      this.expect(isValidArray(null)).to.be.true;
    });

    it('should return true when empty array given', function() {
      this.expect(isValidArray([])).to.be.true;
    });

    it('should return false when array with items given', function() {
      this.expect(isValidArray([1])).to.be.false;
    });

  });

});
