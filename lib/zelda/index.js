'use strict';

const optionsFactory = require('../utils').optionsFactory;
const tokenPlaceholderExchangerFactory = require('../utils').tokenPlaceholderExchangerFactory;
const isValidTarget = require('../utils').isValidTarget;
const linkify = require('../utils').linkify;

const URL_PATTERN = /((?:https?|ftp):\/\/[A-Za-z0-9][-A-Za-z0-9+&@#\/%?=~_|\[\]\(\)!:,.;$]*[-A-Za-z0-9+&@#\/%=~_|\[\]$])/gi; // eslint-disable-line max-len
const EMAIL_PATTERN = /([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/gi; // eslint-disable-line security/detect-unsafe-regex, max-len

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
    transformedText = this._linkifyEmails(transformedText);
    transformedText = this._revertTokens(transformedText);
    return transformedText;
  }

  collectLinks(text) {
    if (!text) { return []; }

    let transformedText = this._replaceTokens(text);

    let links = [].concat(
      this._collectByPattern(URL_PATTERN, transformedText),
      this._collectByPattern(EMAIL_PATTERN, transformedText)
    );

    return links.map(link => this._revertLink.bind(this, transformedText)(link));
  }

  _collectByPattern(pattern, text) {
    let links = [];
    let match;

    while (match = pattern.exec(text)) {
      links.push({ url: match[0], offset: match.index });
    }

    return links;
  }

  _revertLink(transformedText, link) {
    return {
      url: this._revertTokens(link.url),
      offset: this._getOriginalOffset(transformedText, link.offset)
    };
  }

  _getOriginalOffset(transformedText, invalidOffset) {
    return this._revertTokens(transformedText.substring(0, invalidOffset)).length;
  }

  _linkifyUrls(text, target) {
    if (!isValidTarget(target)) { target = ''; }
    return text.replace(URL_PATTERN, url => linkify(url, target));
  }

  _linkifyEmails(text) {
    return text.replace(EMAIL_PATTERN, email => linkify(`mailto:${email}`, null, email));
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
