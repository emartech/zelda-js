'use strict';

const options = require('./');

describe('Utilities', function() {

  describe('Options', function() {

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
        const opts = options({ target: '_blank' });
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

      it('should return with empty array if tokens not given as options', function() {
        const opts = options({});
        this.expect(opts.tokens).to.eql([]);
      });

      it('should return with tokens which given as options', function() {
        const opts = options({ tokens: ['$token$'] });
        this.expect(opts.tokens).to.eql(['$token$']);
      });

    });

  });

});
