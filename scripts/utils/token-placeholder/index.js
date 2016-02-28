'use strict';

const generateTokenRegExp = require('../generate-token-regexp');

class TokenPlaceholder {

  constructor(token, id) {
    if (!token || token.length === 0) { throw new Error('Zelda: Token name not given!'); }
    if (id == null || id < 0) { throw new Error('Zelda: Placeholder id not given!'); }

    this._token = token;
    this._id = id;
  }

  get token() {
    return this._token;
  }

  get tokenRegExp() {
    return generateTokenRegExp(this._token);
  }

  get placeholder() {
    return 'zelda-placeholder:' + this._id;
  }

}

module.exports = TokenPlaceholder;
