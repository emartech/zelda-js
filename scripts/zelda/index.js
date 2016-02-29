'use strict';

const options = require('../utils').options;
const TokenExchanger = require('../utils').tokenExchanger;
const linkify = require('../utils').linkify;

const URL_PATTERN = /((?:https?|ftp):\/\/[A-Za-z0-9][-A-Za-z0-9+&@#\/%?=~_|\[\]\(\)!:,.;$]*[-A-Za-z0-9+&@#\/%=~_|\[\]$])/gi; // eslint-disable-line max-len

class Zelda {

  constructor(opts) {
    this._options = options(opts);

    if (this._options.hasTokens()) {
      this._tokenExchanger = new TokenExchanger(this._options.tokens);
    }
  }

  linkify(text) {
    let transformedText = text || '';
    transformedText = this._replaceTokens(transformedText);
    transformedText = this._linkifyUrls(transformedText);
    transformedText = this._revertTokens(transformedText);
    return transformedText;
  }

  collectUrls(text) {
    if (!text) { return []; }
    let transformedText = this._replaceTokens(text);
    let urls = transformedText.match(URL_PATTERN);
    return urls.map(url => this._revertTokens(url));
  }

  _linkifyUrls(text) {
    if (this._options.hasTarget()) {
      return text.replace(URL_PATTERN, url => linkify(url, this._options.target));
    }

    return text.replace(URL_PATTERN, url => linkify(url));
  }

  _replaceTokens(transformedText) {
    if (this._options.hasTokens()) {
      return this._tokenExchanger.replaceTokens(transformedText);
    }

    return transformedText;
  }

  _revertTokens(transformedText) {
    if (this._options.hasTokens()) {
      return this._tokenExchanger.revertTokens(transformedText);
    }

    return transformedText;
  }

}

module.exports = Zelda;
