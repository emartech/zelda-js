'use strict';

const _pattern = /([^">;]|^)\b((?:https?|ftp):\/\/[A-Za-z0-9][-A-Za-z0-9+&@#\/%?=~_|\[\]\(\)!:,.;$]*[-A-Za-z0-9+&@#\/%=~_|\[\]$])/gi; // eslint-disable-line max-len

class ZeldaJs {

  static transform(text, target) {
    text = text || '';
    target = target || '';
    return text.replace(_pattern, match => ` <a href="${match.trim()}" target="${target}">${match.trim()}</a>`);
  }

}

module.exports = {
  transform: ZeldaJs.transform
};
