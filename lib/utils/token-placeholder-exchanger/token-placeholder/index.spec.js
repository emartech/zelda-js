'use strict';

const TokenPlaceholder = require('./');

describe('Utilities', function() {

  describe('Token Placeholder', function() {

    const createTokenPlaceholder = (name, id) => {
      return new TokenPlaceholder(name, id);
    };

    describe('@token', function() {

      it('should return the token name', function() {
        const tokenPlaceholder = createTokenPlaceholder('#token#', 0);
        this.expect(tokenPlaceholder.token).to.eql('#token#');
      });

    });

    describe('@tokenRegexp', function() {

      it('should return regular expression for token', function() {
        const tokenPlaceholder = createTokenPlaceholder('$token$', 0);
        this.expect(tokenPlaceholder.tokenRegExp).to.eql(/\$token\$/g);
      });

    });

    describe('@placeholder', function() {

      it('should return the placeholder of the token', function() {
        const tokenPlaceholder = createTokenPlaceholder('#token#', 0);
        this.expect(tokenPlaceholder.placeholder).to.eql('zelda_placeholder_0_');
      });

    });

  });

});
