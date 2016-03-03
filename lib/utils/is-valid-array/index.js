'use strict';

module.exports = (array = []) => {
  if (!Array.isArray(array)) { return true; }
  return array.length === 0;
};
