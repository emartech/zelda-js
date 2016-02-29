'use strict';

const targets = require('../../targets');

const _isKeyWord = function(target) {
  return Object.keys(targets).reduce((result, key) => {
    return result || targets[key] === target;
  }, false);
};

const _isBrowsingContext = function(target) {
  return (target.length > 0) && (target.charAt(0) !== '_');
};

const isValidTarget = function(target) {
  if (!target) { return false; }
  if (typeof target !== 'string') { return false; }
  return _isKeyWord(target) || _isBrowsingContext(target);
};

module.exports = isValidTarget;
