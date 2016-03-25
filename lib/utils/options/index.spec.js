'use strict';

const options = require('./');

describe('Utilities', function() {

  describe('Options', function() {

    describe('#setTokens', function() {

      it('should not rewrite tokens when undefined given', function() {
        const tokens = [];
        const opts = options(tokens);

        this.expect(opts.tokens).to.eql(tokens);
        opts.setTokens();
        this.expect(opts.tokens).to.eql(tokens);
      });

      it('should not rewrite tokens when null given', function() {
        const tokens = [];
        const opts = options(tokens);

        this.expect(opts.tokens).to.eql(tokens);
        opts.setTokens(null);
        this.expect(opts.tokens).to.eql(tokens);
      });

      it('should not rewrite tokens when empty array given', function() {
        const tokens = [];
        const opts = options(tokens);

        this.expect(opts.tokens).to.eql(tokens);
        opts.setTokens([]);
        this.expect(opts.tokens).to.eql(tokens);
      });

      it('should rewrite tokens when valid given', function() {
        const tokens = [];
        const opts = options(tokens);

        this.expect(opts.tokens).to.eql(tokens);
        opts.setTokens(['token']);
        this.expect(opts.tokens).to.not.eql(tokens);
        this.expect(opts.tokens).to.eql(['token']);
      });

    });

    describe('#setPlaceholders', function() {

      it('should not rewrite tokens when undefined given', function() {
        const placeholders = [];
        const opts = options(null, placeholders);

        this.expect(opts.placeholders).to.eql(placeholders);
        opts.setPlaceholders();
        this.expect(opts.placeholders).to.eql(placeholders);
      });

      it('should not rewrite placeholders when null given', function() {
        const placeholders = [];
        const opts = options(null, placeholders);

        this.expect(opts.placeholders).to.eql(placeholders);
        opts.setPlaceholders(null);
        this.expect(opts.placeholders).to.eql(placeholders);
      });

      it('should not rewrite placeholders when empty array given', function() {
        const placeholders = [];
        const opts = options(null, placeholders);

        this.expect(opts.placeholders).to.eql(placeholders);
        opts.setPlaceholders([]);
        this.expect(opts.placeholders).to.eql(placeholders);
      });

      it('should rewrite placeholders when valid given', function() {
        const placeholders = [];
        const opts = options(null, placeholders);

        this.expect(opts.placeholders).to.eql(placeholders);
        opts.setPlaceholders(['placeholder']);
        this.expect(opts.placeholders).to.not.eql(placeholders);
        this.expect(opts.placeholders).to.eql(['placeholder']);
      });

    });

    describe('#hasTokens', function() {

      it('should return false if options initialized with undefined', function() {
        const opts = options();
        this.expect(opts.hasTokens()).to.be.false;
      });

      it('should return false if options initialized with null', function() {
        const opts = options(null);
        this.expect(opts.hasTokens()).to.be.false;
      });

      it('should return false if options initialized without tokens', function() {
        const opts = options({});
        this.expect(opts.hasTokens()).to.be.false;
      });

      it('should return false if options initialized with tokens as null', function() {
        const opts = options({ tokens: null });
        this.expect(opts.hasTokens()).to.be.false;
      });

      it('should return false if options initialized with empty token array', function() {
        const opts = options({ tokens: [] });
        this.expect(opts.hasTokens()).to.be.false;
      });

    });

    describe('@tokens', function() {

      it('should return empty array if options initialized with undefined', function() {
        const opts = options();
        this.expect(opts.tokens).to.eql([]);
      });

      it('should return empty array if options initialized with null', function() {
        const opts = options(null);
        this.expect(opts.tokens).to.eql([]);
      });

      it('should return empty array if options initialized with empty array', function() {
        const opts = options([]);
        this.expect(opts.tokens).to.eql([]);
      });

      it('should return with tokens which given', function() {
        const opts = options(['$token$']);
        this.expect(opts.tokens).to.eql(['$token$']);
      });

    });

    describe('@placeholders', function() {

      it('should return empty array if options initialized with undefined', function() {
        const opts = options();
        this.expect(opts.placeholders).to.eql([]);
      });

      it('should return empty array if options initialized with null', function() {
        const opts = options(null, null);
        this.expect(opts.placeholders).to.eql([]);
      });

      it('should return empty array if options initialized with empty array', function() {
        const opts = options(null, []);
        this.expect(opts.placeholders).to.eql([]);
      });

      it('should return with placeholders which given', function() {
        const opts = options(null, ['$placeholder$']);
        this.expect(opts.placeholders).to.eql(['$placeholder$']);
      });

    });

  });

});
