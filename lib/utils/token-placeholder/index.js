'use strict';

const generateTokenRegExp = require('../generate-token-regexp');

class TokenPlaceholder {

  constructor(token, id) {
    if (!token || token.length === 0) { throw new Error('Zelda: Token name not given!'); }
    if (id == null || id < 0) { throw new Error('Zelda: Placeholder id not given!'); }

    this._token = token;
    this._id = id;
    this._tokenRegExp = generateTokenRegExp(this._token);
  }

  get token() {
    return this._token;
  }

  get tokenRegExp() {
    return this._tokenRegExp;
  }

  get placeholder() {
    return ['zelda_placeholder_', this._id, '_'].join('');
  }

}

module.exports = TokenPlaceholder;
