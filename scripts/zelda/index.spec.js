'use strict';

const targets = require('../targets');
const Zelda = require('./');

describe('Zelda', function() {

  describe('#linkify', function() {

    describe('without options', function() {

      [{
        name: 'should return empty string with undefined input given',
        expected: ''
      }, {
        name: 'should return empty string with null input given',
        text: null,
        expected: ''
      }, {
        name: 'should return empty string with empty string input given',
        text: '',
        expected: ''
      }, {
        name: 'should not linkify text if it does not contain urls',
        text: 'This text does not contain urls.',
        expected: 'This text does not contain urls.'
      }, {
        name: 'should linkify text if it contains url',
        text: 'http://www.google.com',
        expected: '<a href="http://www.google.com">http://www.google.com</a>'
      }, {
        name: 'should not change text around the link',
        text: 'This http://www.google.com link.',
        expected: 'This <a href="http://www.google.com">http://www.google.com</a> link.'
      }, {
        name: 'should handle https protocol in urls',
        text: 'This https://www.google.com link.',
        expected: 'This <a href="https://www.google.com">https://www.google.com</a> link.'
      }, {
        name: 'should handle special characters in query string',
        text: 'Go to http://www.google.com?foo=$token$ page.',
        expected: 'Go to <a href="http://www.google.com?foo=$token$">http://www.google.com?foo=$token$</a> page.'
      }, {
        name: 'should handle multiple links',
        text: 'Go to http://www.google.com and http://www.google.com pages.',
        expected: [
          'Go to <a href="http://www.google.com">http://www.google.com</a>',
          'and <a href="http://www.google.com">http://www.google.com</a> pages.'
        ].join(' ')
      }]
      .forEach(testCase => {
        it(testCase.name, function() {
          const zelda = new Zelda();
          const linkifiedText = zelda.linkify(testCase.text);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

    describe('with target option', function() {

      it('should not add target to links when target is a not valid target attribute value', function() {
        const zelda = new Zelda();
        const linkifiedText = zelda.linkify('http://www.google.com', '_not_valid_target');
        this.expect(linkifiedText).to.eql('<a href="http://www.google.com">http://www.google.com</a>');
      });

      [{
        name: 'should linkify text with valid target attribute if it contains url',
        text: 'http://www.google.com',
        expected: '<a href="http://www.google.com" target="_self">http://www.google.com</a>'
      }, {
        name: 'should handle multiple links with target attributes',
        text: 'Go to http://www.google.com and http://www.google.com pages.',
        expected: [
          'Go to <a href="http://www.google.com" target="_self">http://www.google.com</a>',
          'and <a href="http://www.google.com" target="_self">http://www.google.com</a> pages.'
        ].join(' ')
      }]
      .forEach(testCase => {
        it(testCase.name, function() {
          const zelda = new Zelda();
          const linkifiedText = zelda.linkify(testCase.text, targets.SELF);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

    describe('with tokens option', function() {

      [{
        name: 'should linkify text if it contains url with a tokens',
        text: 'http://www.google.com?$token #1$=$token #2$',
        expected: [
          '<a href="http://www.google.com?$token #1$=$token #2$">',
          'http://www.google.com?$token #1$=$token #2$</a>'
        ].join('')
      }, {
        name: 'should not change tokens outside of urls',
        text: 'http://www.google.com $token #3$',
        expected: '<a href="http://www.google.com">http://www.google.com</a> $token #3$'
      }, {
        name: 'should handle multiple urls with tokens',
        text: 'http://www.google.com?$token #1$ http://www.google.com?$token #2$',
        expected: [
          '<a href="http://www.google.com?$token #1$">http://www.google.com?$token #1$</a>',
          '<a href="http://www.google.com?$token #2$">http://www.google.com?$token #2$</a>'
        ].join(' ')
      }]
      .forEach(testCase => {
        it(testCase.name, function() {
          const zelda = new Zelda({ tokens: ['$token #1$', '$token #2$', '$token #3$'] });
          const linkifiedText = zelda.linkify(testCase.text);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

    describe('with target and tokens options', function() {

      [{
        name: 'should linkify text if it contains url with a tokens and add target attribute',
        text: 'http://www.google.com?$token #1$=$token #2$ $token #2$',
        expected: [
          '<a href="http://www.google.com?$token #1$=$token #2$" target="_blank">',
          'http://www.google.com?$token #1$=$token #2$</a> $token #2$'
        ].join('')
      }]
      .forEach(testCase => {
        it(testCase.name, function() {
          const zelda = new Zelda({ tokens: ['$token #1$', '$token #2$'] });
          const linkifiedText = zelda.linkify(testCase.text, targets.BLANK);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

  });

  describe('#collectUrls', function() {

    it('should return with empty array when text is undefined', function() {
      const zelda = new Zelda();
      const links = zelda.collectUrls();
      this.expect(links).to.eql([]);
    });

    it('should return with empty array when text is null', function() {
      const zelda = new Zelda(null);
      const links = zelda.collectUrls();
      this.expect(links).to.eql([]);
    });

    it('should return with empty array when text is empty string', function() {
      const zelda = new Zelda('');
      const links = zelda.collectUrls();
      this.expect(links).to.eql([]);
    });

    it('should collect urls from text', function() {
      const zelda = new Zelda();
      const links = zelda.collectUrls('http://google.com, https://www.google.com');
      this.expect(links).to.eql(['http://google.com', 'https://www.google.com']);
    });

    it('should collect urls with tokens from text', function() {
      const zelda = new Zelda({ tokens: ['$token #1$'] });
      const links = zelda.collectUrls('http://google.com?$token #1$');
      this.expect(links).to.eql(['http://google.com?$token #1$']);
    });

    it('should collect urls without tokens from text when tokens not defined', function() {
      const zelda = new Zelda();
      const links = zelda.collectUrls('http://google.com?$token #1$');
      this.expect(links).to.eql(['http://google.com?$token']);
    });

  });

});
