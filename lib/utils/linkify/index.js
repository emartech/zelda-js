'use strict';

const _generateTarget = function(target) {
  if (!target) { return ''; }
  return ` target="${ target }"`;
};

const linkify = function(url, target, text = '') {
  if (!url) { return ''; }
  url = url.trim();
  text = (text || url).trim();
  return `<a href="${url}"${ _generateTarget(target) }>${text}</a>`;
};

module.exports = linkify;
