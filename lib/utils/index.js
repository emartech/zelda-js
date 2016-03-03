'use strict';

const isValidTarget = require('./is-valid-target');
const linkify = require('./linkify');
const optionsFactory = require('./options');
const tokenPlaceholderExchangerFactory = require('./token-placeholder-exchanger');

module.exports = {
  isValidTarget,
  linkify,
  optionsFactory,
  tokenPlaceholderExchangerFactory
};
