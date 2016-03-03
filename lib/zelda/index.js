'use strict';

const optionsFactory = require('../utils').optionsFactory;
const tokenPlaceholderExchangerFactory = require('../utils').tokenPlaceholderExchangerFactory;
const isValidTarget = require('../utils').isValidTarget;
const linkify = require('../utils').linkify;

const URL_PATTERN = /((?:https?|ftp):\/\/[A-Za-z0-9][-A-Za-z0-9+&@#\/%?=~_|\[\]\(\)!:,.;$]*[-A-Za-z0-9+&@#\/%=~_|\[\]$])/gi; // eslint-disable-line max-len

class Zelda {

  constructor(tokens) {
    this._options = optionsFactory(tokens);
    this._tokenPlaceholderExchanger = tokenPlaceholderExchangerFactory(this._options);
  }

  setTokens(tokens = []) {
    this._options.setTokens(tokens);
    this._tokenPlaceholderExchanger.setOptions(this._options);
  }

  linkify(text, target) {
    let transformedText = text || '';
    transformedText = this._replaceTokens(transformedText);
    transformedText = this._linkifyUrls(transformedText, target);
    transformedText = this._revertTokens(transformedText);
    return transformedText;
  }

  collectUrls(text) {
    if (!text) { return []; }
    let transformedText = this._replaceTokens(text);
    let urls = transformedText.match(URL_PATTERN);
    return urls.map(url => this._revertTokens(url));
  }

  _linkifyUrls(text, target) {
    if (!isValidTarget(target)) { target = ''; }
    return text.replace(URL_PATTERN, url => linkify(url, target));
  }

  _replaceTokens(transformedText) {
    if (this._options.hasTokens()) {
      return this._tokenPlaceholderExchanger.replaceTokens(transformedText);
    }

    return transformedText;
  }

  _revertTokens(transformedText) {
    if (this._options.hasTokens()) {
      return this._tokenPlaceholderExchanger.revertTokens(transformedText);
    }

    return transformedText;
  }

  static create(tokens = []) {
    return new Zelda(tokens);
  }

}

module.exports = Zelda.create;
