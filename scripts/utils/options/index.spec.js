'use strict';

const options = require('./');

describe('Utilities', function() {

  describe('Options', function() {

    describe('#hasTarget', function() {

      it('should return false if options initialized with undefined', function() {
        const opts = options();
        this.expect(opts.hasTarget()).to.be.false;
      });

      it('should return false if options initialized with null', function() {
        const opts = options(null);
        this.expect(opts.hasTarget()).to.be.false;
      });

      it('should return false if options initialized with not valid target', function() {
        const opts = options({ target: '_not_valid_target' });
        this.expect(opts.hasTarget()).to.be.false;
      });

      it('should return true if options initialized with valid target', function() {
        const opts = options({ target: '_self' });
        this.expect(opts.hasTarget()).to.be.true;
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

    describe('@target', function() {

      it('should return with empty string if target not given as options', function() {
        const opts = options({});
        this.expect(opts.target).to.eql('');
      });

      it('should return with empty string if invalid target given as options', function() {
        const opts = options({ target: '_invalid_target' });
        this.expect(opts.target).to.eql('');
      });

      it('should return the valid target which given as options', function() {
        const opts = options({ target: '_self' });
        this.expect(opts.target).to.eql('_self');
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
