'use strict';

const generatePlaceholderText = require('./');

describe('Utilities', function() {

  describe('#generatePlaceholderText', function() {

    it('should generate a valid placeholder text from token id', function() {
      const tokenId = 32;
      const expectedPlaceholderText = 'zelda_placeholder_32_';

      this.expect(generatePlaceholderText(tokenId)).to.eql(expectedPlaceholderText);
    });

  });

});
