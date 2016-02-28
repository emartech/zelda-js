'use strict';

const isValidTarget = require('../is-valid-target');

class Options {

  constructor(opts) {
    this._target = isValidTarget(opts.target) ? opts.target : '';
    this._tokens = opts.tokens || [];
  }

  get target() {
    return this._target;
  }

  get tokens() {
    return this._tokens;
  }

  hasTarget() {
    return !!this._target;
  }

  hasTokens() {
    return this._tokens && this._tokens.length > 0;
  }

  static create(opts) {
    return new Options(opts || {});
  }

}

module.exports = Options.create;
