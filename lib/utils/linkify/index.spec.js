'use strict';

const linkify = require('./');

describe('Utilities', function() {

  describe('#linkify', function() {

    it('should return empty string when undefined input given', function() {
      const output = linkify();
      this.expect(output).to.eql('');
    });

    it('should return empty string when null input given', function() {
      const output = linkify(null);
      this.expect(output).to.eql('');
    });

    it('should return empty string when empty string given', function() {
      const output = linkify('');
      this.expect(output).to.eql('');
    });

    it('should return a valid HTML <a> tag with the url in the text content when only url given', function() {
      const output = linkify('url');
      this.expect(output).to.eql('<a href="url">url</a>');
    });

    it('should handle spaces in href attribute and text content', function() {
      const output = linkify('  url   ');
      this.expect(output).to.eql('<a href="url">url</a>');
    });

    it('should not add target attribute if null target given', function() {
      const output = linkify('url', null);
      this.expect(output).to.eql('<a href="url">url</a>');
    });

    it('should not add target attribute if empty string target given', function() {
      const output = linkify('url', '');
      this.expect(output).to.eql('<a href="url">url</a>');
    });

    it('should add target attribute if target given', function() {
      const output = linkify('url', 'target');
      this.expect(output).to.eql('<a href="url" target="target">url</a>');
    });

    it('should set text of link', function() {
      const output = linkify('url', 'target', 'text');
      this.expect(output).to.eql('<a href="url" target="target">text</a>');
    });

  });

});
