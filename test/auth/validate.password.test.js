'use strict';

require('../_setup');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var validatePassword = require(global.lib_path + '/auth/validate/validate.password');

var BadPasswordNoCap = 'tpfeidn234';
var BadPasswordNoNum = 'TPfEidnsin';
var BadPasswordNoChar = '9293847382';
var BadPasswordTooShort = 'sodinF2';
var BadPasswordTooLong = 'fidnsiIndiw34sifjeind99eksnidinfsldkeignfisndieifjdisndkindsllldkdn';

var GoodPass = 'Hif43lskf';

describe('Password Validation Utility', function() {

  it('Confirms Password Validation Fails on Bad Passwords', function() {
    expect(validatePassword(BadPasswordNoCap)).to.be.false;
    expect(validatePassword(BadPasswordNoNum)).to.be.false;
    expect(validatePassword(BadPasswordNoChar)).to.be.false;
    expect(validatePassword(BadPasswordTooShort)).to.be.false;
    expect(validatePassword(BadPasswordTooLong)).to.be.false;
  });

  it('Confirms Validation Succeeds on Good Password', function() {
    expect(validatePassword(GoodPass)).to.be.true;
  });

  it('Confirms Validation Fails when called with non string', function() {
    expect(validatePassword(null)).to.be.false;
    expect(validatePassword({})).to.be.false;
    expect(validatePassword([])).to.be.false;
    expect(validatePassword(new Error())).to.be.false;
  });
});
