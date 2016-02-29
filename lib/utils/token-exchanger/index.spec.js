'use strict';

const TokenExchanger = require('./');

describe('Utilities', function() {

  describe('Token Exchanger', function() {

    const tokens = [
      '#token 1#',
      '@token 2@',
      '$token 3$'
    ];

    const createTokenExchanger = tokens => new TokenExchanger(tokens);

    describe('on init', function() {

      it('should throw exception when tokens is not given', function() {
        this.expect(createTokenExchanger).to.throw('Zelda: Tokens not given!');
      });

    });

    describe('#replaceTokens', function() {

      [{
        text: '#token 1#',
        expected: 'zelda-placeholder:0'
      }, {
        text: '#token 1#@token 2@$token 3$',
        expected: 'zelda-placeholder:0zelda-placeholder:1zelda-placeholder:2'
      }, {
        text: '@token #token 1#2$',
        expected: '@token zelda-placeholder:02$'
      }, {
        text: 'This is a text with a $token 3$ token.',
        expected: 'This is a text with a zelda-placeholder:2 token.'
      }, {
        text: 'thisisatest$token 3$$token3$text',
        expected: 'thisisatestzelda-placeholder:2$token3$text'
      }, {
        text: '@token 2@ @token 2@',
        expected: 'zelda-placeholder:1 zelda-placeholder:1'
      }, {
        text: '$token 3$ $token 3$',
        expected: 'zelda-placeholder:2 zelda-placeholder:2'
      }]
      .forEach(testCase => {
        it(`should replace tokens with zelda placeholders in text given in ${testCase.text}`, function() {
          const tokenExchanger = createTokenExchanger(tokens);
          const replacedText = tokenExchanger.replaceTokens(testCase.text);
          this.expect(replacedText).to.eql(testCase.expected);
        });
      });

    });

    describe('#revertTokens', function() {

      [{
        text: 'zelda-placeholder:0',
        expected: '#token 1#'
      }, {
        text: 'zelda-placeholder:0zelda-placeholder:1zelda-placeholder:2',
        expected: '#token 1#@token 2@$token 3$'
      }, {
        text: '@token zelda-placeholder:02$',
        expected: '@token #token 1#2$'
      }, {
        text: 'This is a text with a zelda-placeholder:2 token.',
        expected: 'This is a text with a $token 3$ token.'
      }, {
        text: 'thisisatestzelda-placeholder:2$token3$text',
        expected: 'thisisatest$token 3$$token3$text'
      }, {
        text: 'zelda-placeholder:2 zelda-placeholder:2',
        expected: '$token 3$ $token 3$'
      }]
      .forEach(testCase => {
        it(`should replace zelda placeholders with tokens in text given in ${testCase.text}`, function() {
          const tokenExchanger = createTokenExchanger(tokens);
          const revertedText = tokenExchanger.revertTokens(testCase.text);
          this.expect(revertedText).to.eql(testCase.expected);
        });
      });

    });

  });

});
