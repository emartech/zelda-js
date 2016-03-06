'use strict';

const generateTokenRegExp = require('../generate-token-regexp').generateTokenRegExp;
const generatePlaceholderText = require('./generate-placeholder-text');

class TokenPlaceholder {

  constructor(token, id) {
    this._token = token;
    this._id = id;
    this._tokenRegExp = generateTokenRegExp(this._token);
    this._placeholder = generatePlaceholderText(this._id);
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
