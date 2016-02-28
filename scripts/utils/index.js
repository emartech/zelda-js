'use strict';

const isValidTarget = require('./is-valid-target');
const linkify = require('./linkify');
const options = require('./options');
const tokenExchanger = require('./token-exchanger');

module.exports = {
  isValidTarget: isValidTarget,
  linkify: linkify,
  options: options,
  tokenExchanger: tokenExchanger
};
