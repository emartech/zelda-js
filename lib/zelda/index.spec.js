'use strict';

const targets = require('../targets');
const zeldaFactory = require('./');

describe('Zelda', function() {

  describe('#setTokens', function() {

    it('should not recognize tokens in urls when options not setted via setTokens', function() {
      const zelda = zeldaFactory();
      const linkifiedText = zelda.collectLinks('http://google.com?$long token$');
      this.expect(linkifiedText).to.eql([{ url: 'http://google.com?$long', offset: 0 }]);
    });

    it('should not recognize tokens in urls when invalid options setted via setTokens', function() {
      const zelda = zeldaFactory();
      zelda.setTokens('$long token$');
      const linkifiedText = zelda.collectLinks('http://google.com?$long token$');
      this.expect(linkifiedText).to.eql([{ url: 'http://google.com?$long', offset: 0 }]);
    });

    it('should recognize tokens in urls when options setted via setTokens', function() {
      const zelda = zeldaFactory();
      zelda.setTokens(['$long token$']);
      const linkifiedText = zelda.collectLinks('http://google.com?$long token$');
      this.expect(linkifiedText).to.eql([{ url: 'http://google.com?$long token$', offset: 0 }]);
    });

  });

  describe('#setPlaceholders', function() {

    it('should not recognize placeholders in urls when options not setted via setPlaceholders', function() {
      const zelda = zeldaFactory();
      const linkifiedText = zelda.collectLinks('foo#placeholder#bar');
      this.expect(linkifiedText).to.eql([]);
    });

    it('should not recognize placeholders in urls when invalid options setted via setPlaceholders', function() {
      const zelda = zeldaFactory();
      zelda.setPlaceholders('#placeholder#');
      const linkifiedText = zelda.collectLinks('foo#placeholder#bar');
      this.expect(linkifiedText).to.eql([]);
    });

    it('should recognize placeholders in urls when options setted via setPlaceholders', function() {
      const zelda = zeldaFactory();
      zelda.setPlaceholders(['#placeholder#']);
      const linkifiedText = zelda.collectLinks('foo#placeholder#bar');
      this.expect(linkifiedText).to.eql([{ url: '#placeholder#', offset: 3 }]);
    });

  });

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
        name: 'should linkify email address',
        text: 'email@address.com',
        expected: '<a href="mailto:email@address.com">email@address.com</a>'
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
          const zelda = zeldaFactory();
          const linkifiedText = zelda.linkify(testCase.text);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

    describe('with target option', function() {

      it('should not add target to links when target is a not valid target attribute value', function() {
        const zelda = zeldaFactory();
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
          const zelda = zeldaFactory();
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
          const zelda = zeldaFactory(['$token #1$', '$token #2$', '$token #3$']);
          const linkifiedText = zelda.linkify(testCase.text);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

    describe('with placeholders option', function() {

      [{
        name: 'should linkify text if it contains placeholder',
        text: 'foo#PH1#bar',
        expected: 'foo<a href="#PH1#">#PH1#</a>bar'
      }, {
        name: 'should handle multiple placeholders',
        text: 'foo#PH1#bar#PH1#bar#PH2#foo',
        expected: 'foo<a href="#PH1#">#PH1#</a>bar<a href="#PH1#">#PH1#</a>bar<a href="#PH2#">#PH2#</a>foo'
      }]
      .forEach(testCase => {
        it(testCase.name, function() {
          const zelda = zeldaFactory([], ['#PH1#', '#PH2#']);
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
          const zelda = zeldaFactory(['$token #1$', '$token #2$']);
          const linkifiedText = zelda.linkify(testCase.text, targets.BLANK);
          this.expect(linkifiedText).to.eql(testCase.expected);
        });
      });

    });

  });

  describe('#collectLinks', function() {

    it('should return with empty array when text is undefined', function() {
      const zelda = zeldaFactory();
      const links = zelda.collectLinks();
      this.expect(links).to.eql([]);
    });

    it('should return with empty array when text is null', function() {
      const zelda = zeldaFactory();
      const links = zelda.collectLinks(null);
      this.expect(links).to.eql([]);
    });

    it('should return with empty array when text is empty string', function() {
      const zelda = zeldaFactory();
      const links = zelda.collectLinks('');
      this.expect(links).to.eql([]);
    });

    it('should return collection of url/email and offset from text', function() {
      const zelda = zeldaFactory();
      const links = zelda.collectLinks('http://google.com, https://www.google.com, email@address.com');
      this.expect(links).to.eql([
        { url: 'http://google.com', offset: 0 },
        { url: 'https://www.google.com', offset: 19 },
        { url: 'email@address.com', offset: 43 }
      ]);
    });

    it('should return collection of urls and offset from text when placeholders are set', function() {
      const zelda = zeldaFactory([], ['#PH1#', '#PH2#']);
      const links = zelda.collectLinks('foo#PH1#bar#PH1#bar#PH2#foo');
      this.expect(links).to.eql([
        { url: '#PH1#', offset: 3 },
        { url: '#PH1#', offset: 11 },
        { url: '#PH2#', offset: 19 }
      ]);
    });

    it('should return urls and offsets with tokens from text', function() {
      const zelda = zeldaFactory(['$token #1$']);
      const links = zelda.collectLinks('http://google.com?$token #1$');
      this.expect(links).to.eql([{ url: 'http://google.com?$token #1$', offset: 0 }]);
    });

    it('should return urls and offsets without tokens from text when tokens not defined', function() {
      const zelda = zeldaFactory();
      const links = zelda.collectLinks('http://google.com?$token #1$');
      this.expect(links).to.eql([{ url: 'http://google.com?$token', offset: 0 }]);
    });

    it('should return offsets correctly when there are multiple urls in text', function() {
      const zelda = zeldaFactory(['$token #1$', '$token #2$', '$token #3$']);

      const links = zelda
        .collectLinks('http://google.com?$token #1$ http://google.com?$token #2$ http://google.com?$token #3$');

      this.expect(links).to.eql([
        { url: 'http://google.com?$token #1$', offset: 0 },
        { url: 'http://google.com?$token #2$', offset: 29 },
        { url: 'http://google.com?$token #3$', offset: 58 }
      ]);
    });

    it('should return offsets correctly when there are several tokens in text', function() {
      const zelda = zeldaFactory(['$token #1$', '$token #2$', '$token #3$']);

      const links = zelda
        .collectLinks('$token #1$$token #2$ http://google.com?$token #3$');

      this.expect(links).to.eql([{ url: 'http://google.com?$token #3$', offset: 21 }]);
    });

    it('should return links in order of appearance', function() {
      const zelda = zeldaFactory(null, ['#placeholder#']);
      const links = zelda
        .collectLinks('foo #placeholder# http://google.com bar #placeholder#');

      this.expect(links).to.eql([
        { url: '#placeholder#', offset: 4 },
        { url: 'http://google.com', offset: 18 },
        { url: '#placeholder#', offset: 40 }
      ]);
    });

  });

});
