'use strict';

const transformSpecialCharacters = require('./');

describe('Utilites', function() {

  describe('#transformSpecialCharacters', function() {

    [
      {
        text: 'some \\text',
        expected: 'some \\\\text'
      }, {
        text: 'some text^',
        expected: 'some text\\^'
      }, {
        text: '$some text',
        expected: '\\$some text'
      }, {
        text: 'some* text',
        expected: 'some\\* text'
      }, {
        text: 'some + text',
        expected: 'some \\+ text'
      }, {
        text: 'some text ?',
        expected: 'some text \\?'
      }, {
        text: '. some text',
        expected: '\\. some text'
      }, {
        text: '$SN) MBC_soul$',
        expected: '\\$SN\\) MBC_soul\\$'
      }, {
        text: '[',
        expected: '\\['
      }, {
        text: ']',
        expected: '\\]'
      }, {
        text: 'some[Z-A]text',
        expected: 'some\\[Z-A\\]text'
      }
    ]
    .forEach(testCase => {
      it(`should transform special characters in ${testCase.text}`, function() {
        const transformedText = transformSpecialCharacters(testCase.text);
        this.expect(transformedText).to.eql(testCase.expected);
      });
    });

  });

});
