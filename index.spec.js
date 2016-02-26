'use strict';

const ZeldaJs = require('./');
const expect = require('expect.js');

describe('ZeldaJs', function() {

  describe('transform', function() {

    it('should return empty string with undefined input', function() {
      expect(ZeldaJs.transform(undefined)).to.eql('');
    });


    it('should handle a simple url', function() {
      expect(ZeldaJs.transform('Go to http://www.example.com page'))
        .to.eql('Go to <a href="http://www.example.com" target="">http://www.example.com</a> page');
    });

    it('should handle a HTTPS url', function() {
      expect(ZeldaJs.transform('Go to https://example.com page'))
        .to.eql('Go to <a href="https://example.com" target="">https://example.com</a> page');
    });

    it('should handle special characters in query string', function() {
      expect(ZeldaJs.transform('Go to http://www.colingo.com?foo=$token$ page'))
        .to.eql('Go to <a href="http://www.colingo.com?foo=$token$" target="">http://www.colingo.com?foo=$token$</a> page');
    });

    it('should accept a target attribute', function() {
      expect(ZeldaJs.transform('Go to http://example.com page', '_blank'))
        .to.eql('Go to <a href="http://example.com" target="_blank">http://example.com</a> page');
    });

  });

});
