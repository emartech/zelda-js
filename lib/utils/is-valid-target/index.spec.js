'use strict';

const isValidTarget = require('./');

describe('Utilities', function() {

  describe('#isValidTarget', function() {

    [{
      name: 'should return false if undefined input given',
      expected: false
    }, {
      name: 'should return false if null input given',
      input: null,
      expected: false
    }, {
      name: 'should return false if not string input given',
      input: {},
      expected: false
    }, {
      name: 'should return false if empty string input given',
      input: '',
      expected: false
    }, {
      name: 'should return true if _blank given',
      input: '_blank',
      expected: true
    }, {
      name: 'should return true if _self given',
      input: '_self',
      expected: true
    }, {
      name: 'should return true if _parent given',
      input: '_parent',
      expected: true
    }, {
      name: 'should return true if _top given',
      input: '_top',
      expected: true
    }, {
      name: 'should return false if not a browsing-context name given',
      input: '_wrong',
      expected: false
    }, {
      name: 'should return true if a browsing-context name given',
      input: 'a',
      expected: true
    }]
    .forEach(testCase => {
      it(testCase.name, function() {
        const output = isValidTarget(testCase.input);
        this.expect(output).to.eql(testCase.expected);
      });
    });

  });

});
