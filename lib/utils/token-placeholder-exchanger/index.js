'use strict';

const TokenPlaceholder = require('./token-placeholder');
const createRegExp = require('./generate-token-regexp').createRegExp;

class TokenPlaceholderExchanger {

  constructor(options) {
    this._tokenPlaceholders = [];
    this.setOptions(options);
  }

  setOptions(options) {
    this._options = options;
    this._initializeTokenPlaceholders();
  }

  replaceTokens(text) {
    return this._exchange(text, this._tokenReplacer.bind(this));
  }

  revertTokens(text) {
    return this._exchange(text, this._placeholderReplacer.bind(this));
  }

  _initializeTokenPlaceholders() {
    this._tokenPlaceholders = this._options.tokens.map((token, index) =>
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
    const placeholderRegExp = createRegExp(tokenPlaceholder.placeholder);
    return text.replace(placeholderRegExp, tokenPlaceholder.token);
  }

  static create(options = {}) {
    return new TokenPlaceholderExchanger(options);
  }

}

module.exports = TokenPlaceholderExchanger.create;
