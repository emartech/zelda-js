'use strict';

const TokenPlaceholder = require('./');

describe('Utilities', function() {

  describe('Token Placeholder', function() {

    const createTokenPlaceholder = (name, id) => {
      return new TokenPlaceholder(name, id);
    };

    describe('on init', function() {

      it('should throw exception when name is not given', function() {
        this.expect(createTokenPlaceholder).to.throw('Zelda: Token name not given!');
      });

      it('should throw exception when id is not given', function() {
        this.expect(createTokenPlaceholder.bind({}, '#token#')).to.throw('Zelda: Placeholder id not given!');
      });

    });

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
