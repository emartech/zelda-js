'use strict';

const _specialCharacters = [
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

const transformSpecialCharacters = function(token) {
  return _specialCharacters.reduce((transformedToken, special) => {
    return transformedToken.replace(special.regexp, '\\' + special.chr);
  }, token);
};

module.exports = transformSpecialCharacters;
