'use strict';

const generateTokenRegExp = require('../generate-token-regexp');

class TokenPlaceholder {

  constructor(token, id) {
    this._token = token;
    this._id = id;
    this._tokenRegExp = generateTokenRegExp(this._token);
    this._placeholder = ['zelda_placeholder_', this._id, '_'].join('');
  }

  get token() {
    return this._token;
  }

  get tokenRegExp() {
    return this._tokenRegExp;
  }

  get placeholder() {
    return this._placeholder;
  }

}

module.exports = TokenPlaceholder;
