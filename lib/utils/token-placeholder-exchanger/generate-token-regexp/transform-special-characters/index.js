'use strict';

const transformSpecialCharacters = function(token) {
  return token.replace(/([\\^$*+?.\(\)])/g, '\\$1');
};

module.exports = transformSpecialCharacters;
