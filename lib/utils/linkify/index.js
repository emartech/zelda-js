'use strict';

const _generateTarget = function(target) {
  if (!target) { return ''; }
  return ` target="${ target }"`;
};

const linkify = function(url, target) {
  if (!url) { return ''; }
  return `<a href="${ url.trim() }"${ _generateTarget(target) }>${ url.trim() }</a>`;
};

module.exports = linkify;
