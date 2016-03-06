'use strict';

const transformSpecialCharacters = require('./transform-special-characters');

class TokenRegExp {

  static generateTokenRegExp(token) {
    const regExpCompatibleToken = transformSpecialCharacters(token);
    return TokenRegExp.createRegExp(regExpCompatibleToken);
  }

  static createRegExp(substr) {
    return new RegExp(substr, 'g');
  }

}

module.exports = TokenRegExp;
