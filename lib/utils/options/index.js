'use strict';

const isValidArray = require('./is-valid-array');

class Options {

  constructor(tokens, placeholders) {
    this._tokens = this._initializeTokens(tokens);
    this._placeholders = this._initializePlaceholders(placeholders);
  }

  get tokens() {
    return this._tokens;
  }

  get placeholders() {
    return this._placeholders;
  }

  setTokens(tokens = []) {
    if (isValidArray(tokens)) { return; }
    this._tokens = tokens;
  }

  setPlaceholders(placeholders = []) {
    if (isValidArray(placeholders)) { return; }
    this._placeholders = placeholders;
  }

  hasTokens() {
    return !isValidArray(this._tokens);
  }

  _initializeTokens(tokens) {
    return !isValidArray(tokens) ? tokens : [];
  }

  _initializePlaceholders(placeholders) {
    return !isValidArray(placeholders) ? placeholders : [];
  }

  static create(tokens = [], placeholders = []) {
    return new Options(tokens, placeholders);
  }

}

module.exports = Options.create;
