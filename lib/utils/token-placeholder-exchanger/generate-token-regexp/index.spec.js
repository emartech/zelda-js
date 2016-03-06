'use strict';

const TokenRegExp = require('./');

describe('Utilities', function() {

  describe('Token RegExp', function() {

    const generateTokenRegExp = TokenRegExp.generateTokenRegExp;
    const createRegExp = TokenRegExp.createRegExp;

    describe('#generateTokenRegExp', function() {

      describe('token does not contain special regexp characters', function() {

        it('should generate regular expression with global match from token', function() {
          const tokenRegexp = generateTokenRegExp('@token 1@');
          this.expect(tokenRegexp).to.eql(/@token 1@/g);
        });

      });

      describe('token contains special regexp characters', function() {

        [{
          token: '\\token\\',
          regexp: /\\token\\/g
        }, {
          token: '^token^',
          regexp: /\^token\^/g
        }, {
          token: '$token$',
          regexp: /\$token\$/g
        }, {
          token: '*token*',
          regexp: /\*token\*/g
        }, {
          token: '+token+',
          regexp: /\+token\+/g
        }, {
          token: '?token?',
          regexp: /\?token\?/g
        }, {
          token: '.token.',
          regexp: /\.token\./g
        }, {
          token: '@token .1@',
          regexp: /@token \.1@/g
        }]
        .forEach(testCase => {
          it(`should handle special characters in ${testCase.token}`, function() {
            const tokenRegExp = generateTokenRegExp(testCase.token);
            this.expect(tokenRegExp).to.eql(testCase.regexp);
          });
        });

      });

    });

    describe('#createRegExp', function() {

      it('should create regular expression with global flag from string', function() {
        const stringInput = 'some text';
        const regExpOutput = /some text/g;

        this.expect(createRegExp(stringInput)).to.eql(regExpOutput);
      });

    });

  });

});
