'use strict';

const TokenExchanger = require('./');

describe('Utilities', function() {

  describe('Token Exchanger', function() {

    const tokens = [
      '#token 1#',
      '@token 2@',
      '$token 3$'
    ];

    const lotOfTokens = [
      'token0', 'token1', 'token2', 'token3', 'token4',
      'token5', 'token6', 'token7', 'token8', 'token9',
      'token10'
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
        expected: 'zelda_placeholder_0_'
      }, {
        text: '#token 1#@token 2@$token 3$',
        expected: 'zelda_placeholder_0_zelda_placeholder_1_zelda_placeholder_2_'
      }, {
        text: '@token #token 1#2$',
        expected: '@token zelda_placeholder_0_2$'
      }, {
        text: 'This is a text with a $token 3$ token.',
        expected: 'This is a text with a zelda_placeholder_2_ token.'
      }, {
        text: 'thisisatest$token 3$$token3$text',
        expected: 'thisisatestzelda_placeholder_2_$token3$text'
      }, {
        text: '@token 2@ @token 2@',
        expected: 'zelda_placeholder_1_ zelda_placeholder_1_'
      }, {
        text: '$token 3$ $token 3$',
        expected: 'zelda_placeholder_2_ zelda_placeholder_2_'
      }]
      .forEach(testCase => {
        it(`should replace tokens with zelda placeholders in text given in ${testCase.text}`, function() {
          const tokenExchanger = createTokenExchanger(tokens);
          const replacedText = tokenExchanger.replaceTokens(testCase.text);
          this.expect(replacedText).to.eql(testCase.expected);
        });
      });

      it('should not mix tokens when using lot of tokens', function() {
        const tokenExchanger = createTokenExchanger(lotOfTokens);
        const revertedText = tokenExchanger.replaceTokens('token1');
        this.expect(revertedText).to.eql('zelda_placeholder_1_');
      });

    });

    describe('#revertTokens', function() {

      [{
        text: 'zelda_placeholder_0_',
        expected: '#token 1#'
      }, {
        text: 'zelda_placeholder_0_zelda_placeholder_1_zelda_placeholder_2_',
        expected: '#token 1#@token 2@$token 3$'
      }, {
        text: '@token zelda_placeholder_0_2$',
        expected: '@token #token 1#2$'
      }, {
        text: 'This is a text with a zelda_placeholder_2_ token.',
        expected: 'This is a text with a $token 3$ token.'
      }, {
        text: 'thisisatestzelda_placeholder_2_$token3$text',
        expected: 'thisisatest$token 3$$token3$text'
      }, {
        text: 'zelda_placeholder_2_ zelda_placeholder_2_',
        expected: '$token 3$ $token 3$'
      }]
      .forEach(testCase => {
        it(`should replace zelda placeholders with tokens in text given in ${testCase.text}`, function() {
          const tokenExchanger = createTokenExchanger(tokens);
          const revertedText = tokenExchanger.revertTokens(testCase.text);
          this.expect(revertedText).to.eql(testCase.expected);
        });
      });

      it('should not mix tokens when using lot of tokens', function() {
        const tokenExchanger = createTokenExchanger(lotOfTokens);
        const revertedText = tokenExchanger.revertTokens('zelda_placeholder_1_');
        this.expect(revertedText).to.eql('token1');
      });

    });

  });

});
