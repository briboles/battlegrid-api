'use strict';

require('../_setup');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var validateUser = require(global.lib_path + '/auth/validate/validate.user');

var BadUserEmpty = '';
var BadUserShort = 'resu';
var BadUserLong = 'fidnsifidjsidnfjkdifjdksndifksndkflkjsdf';
var BadUserInval = '*&!(*@#&$)';

var GoodUser = 'testuser';

describe('Username validation Utility', function() {
  it('Confirms Validation Fails on Bad Username', function() {
    expect(validateUser(BadUserEmpty)).to.be.false;
    expect(validateUser(BadUserShort)).to.be.false;
    expect(validateUser(BadUserLong)).to.be.false;
    expect(validateUser(BadUserInval)).to.be.false;
  });

  it('Confirms Validation Passes on Good Password', function() {
    expect(validateUser(GoodUser)).to.be.true;
  });

  it('Confirms Validation Fails when called with non string', function() {
    expect(validateUser(null)).to.be.false;
    expect(validateUser({})).to.be.false;
    expect(validateUser([])).to.be.false;
    expect(validateUser(new Error())).to.be.false;
  });
});
