'use strict';

const TokenPlaceholder = require('../token-placeholder');

class TokenExchanger {

  constructor(tokens) {
    if (!tokens || tokens.length === 0) {
      throw new Error('Zelda: Tokens not given!');
    }

    this._initializeTokenPlaceholders(tokens);
  }

  replaceTokens(text) {
    return this._exchange(text, this._tokenReplacer.bind(this));
  }

  revertTokens(text) {
    return this._exchange(text, this._placeholderReplacer.bind(this));
  }

  _initializeTokenPlaceholders(tokens) {
    this._tokenPlaceholders = tokens.map((token, index) =>
      new TokenPlaceholder(token, index)
    );
  }

  _exchange(text, replacer) {
    return this._tokenPlaceholders.reduce(
      (text, tokenPlaceholder) => replacer(text, tokenPlaceholder),
      text
    );
  }

  _tokenReplacer(text, tokenPlaceholder) {
    return text.replace(tokenPlaceholder.tokenRegExp, tokenPlaceholder.placeholder);
  }

  _placeholderReplacer(text, tokenPlaceholder) {
    const placeholderRegExp = this._createRegExp(tokenPlaceholder.placeholder);
    return text.replace(placeholderRegExp, tokenPlaceholder.token);
  }

  _createRegExp(substr) {
    return new RegExp(substr, 'g');
  }

}

module.exports = TokenExchanger;
