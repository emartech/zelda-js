'use strict';

const optionsFactory = require('../options');
const tokenPlaceholderExchangerFactory = require('./');

describe('Utilities', function() {

  describe('Token Placeholder Exchanger', function() {

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

    const createOptions = tokens => optionsFactory(tokens);

    const createTokenPlaceholderExchanger = options => tokenPlaceholderExchangerFactory(options);

    const createExchangerFromTokens = tokens => createTokenPlaceholderExchanger(createOptions(tokens));

    describe('#setOptions', function() {

      const tokensBefore = [];
      const tokensAfter = ['#token 0#'];

      it('should change replaceTokens result if different options with different tokens given', function() {
        const tokenPlaceholderExchanger = createExchangerFromTokens(tokensBefore);
        this.expect(tokenPlaceholderExchanger.replaceTokens('#token 0#')).to.eql('#token 0#');

        const optionsAfter = createOptions(tokensAfter);
        tokenPlaceholderExchanger.setOptions(optionsAfter);
        this.expect(tokenPlaceholderExchanger.replaceTokens('#token 0#')).to.eql('zelda_placeholder_0_');
      });

      it('should change revertTokens result if different options with different tokens given', function() {
        const tokenPlaceholderExchanger = createExchangerFromTokens(tokensBefore);
        this.expect(tokenPlaceholderExchanger.replaceTokens('zelda_placeholder_0_')).to.eql('zelda_placeholder_0_');

        const optionsAfter = createOptions(tokensAfter);
        tokenPlaceholderExchanger.setOptions(optionsAfter);
        this.expect(tokenPlaceholderExchanger.revertTokens('zelda_placeholder_0_')).to.eql('#token 0#');
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
          const tokenPlaceholderExchanger = createExchangerFromTokens(tokens);
          const replacedText = tokenPlaceholderExchanger.replaceTokens(testCase.text);
          this.expect(replacedText).to.eql(testCase.expected);
        });
      });

      it('should not mix tokens when using lot of tokens', function() {
        const tokenPlaceholderExchanger = createExchangerFromTokens(lotOfTokens);
        const replacedText = tokenPlaceholderExchanger.replaceTokens('token1');
        this.expect(replacedText).to.eql('zelda_placeholder_1_');
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
          const tokenPlaceholderExchanger = createExchangerFromTokens(tokens);
          const revertedText = tokenPlaceholderExchanger.revertTokens(testCase.text);
          this.expect(revertedText).to.eql(testCase.expected);
        });
      });

      it('should not mix tokens when using lot of tokens', function() {
        const tokenPlaceholderExchanger = createExchangerFromTokens(lotOfTokens);
        const revertedText = tokenPlaceholderExchanger.revertTokens('zelda_placeholder_1_');
        this.expect(revertedText).to.eql('token1');
      });

    });

    describe('replace & revert tokens', function() {

      it('should revert token what have been replaced in text', function() {
        const tokenPlaceholderExchanger = createExchangerFromTokens(tokens);
        const replacedText = tokenPlaceholderExchanger.replaceTokens('#token 1#');
        const revertedText = tokenPlaceholderExchanger.revertTokens(replacedText);
        this.expect(revertedText).to.eql('#token 1#');
      });

    });

  });

});
