'use strict';

const isValidArray = require('../is-valid-array');

class Options {

  constructor(tokens) {
    this._tokens = this._initializeTokens(tokens);
  }

  get tokens() {
    return this._tokens;
  }

  setTokens(tokens = []) {
    if (isValidArray(tokens)) { return; }
    this._tokens = tokens;
  }

  hasTokens() {
    return !isValidArray(this._tokens);
  }

  _initializeTokens(tokens) {
    return !isValidArray(tokens) ? tokens : [];
  }

  static create(tokens = []) {
    return new Options(tokens);
  }

}

module.exports = Options.create;
