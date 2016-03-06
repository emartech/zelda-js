'use strict';

const isValidArray = function(array = []) {
  if (!Array.isArray(array)) { return true; }
  return array.length === 0;
};

module.exports = isValidArray;
