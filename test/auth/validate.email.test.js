'use strict';

require('../_setup');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var validateEmail = require(global.lib_path + '/auth/validate/validate.email');

var BadEmail = 'noatsymbol';
var GoodEmail = 'user@domain.com';

describe('Email Validation Utility', function() {
  it('Confirms Validation Fails on bad email', function() {
    expect(validateEmail(BadEmail)).to.be.false;
  });

  it('Confirms Validation Passes on Good Email', function() {
    expect(validateEmail(GoodEmail)).to.be.true;
  });

  it('Confirms Validation Fails when called with non string', function() {
    expect(validateEmail(null)).to.be.false;
    expect(validateEmail({})).to.be.false;
    expect(validateEmail([])).to.be.false;
    expect(validateEmail(new Error())).to.be.false;
  });
});
