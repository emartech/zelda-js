'use strict';

const transformSpecialCharacters = function(token) {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = transformSpecialCharacters;
