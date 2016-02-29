'use strict';

class Options {

  constructor(opts) {
    this._tokens = opts.tokens || [];
  }

  get tokens() {
    return this._tokens;
  }

  hasTokens() {
    return this._tokens && this._tokens.length > 0;
  }

  static create(opts) {
    return new Options(opts || {});
  }

}

module.exports = Options.create;
