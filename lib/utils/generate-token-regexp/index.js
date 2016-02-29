'use strict';

const specialCharacters = [
  {
    chr: '\\',
    regexp: /\\/g
  }, {
    chr: '^',
    regexp: /\^/g
  }, {
    chr: '$',
    regexp: /\$/g
  }, {
    chr: '*',
    regexp: /\*/g
  }, {
    chr: '+',
    regexp: /\+/g
  }, {
    chr: '?',
    regexp: /\?/g
  }, {
    chr: '.',
    regexp: /\./g
  }
];

const createRegExp = function(substr) {
  return new RegExp(substr, 'g');
};

const eliminateSpecialCharacters = function(token) {
  return specialCharacters.reduce((transformedToken, special) => {
    return transformedToken.replace(special.regexp, '\\' + special.chr);
  }, token);
};

const generateTokenRegExp = function(token) {
  const regExpCompatibleToken = eliminateSpecialCharacters(token);
  return createRegExp(regExpCompatibleToken);
};

module.exports = generateTokenRegExp;
