'use strict';

require('../_setup');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var validateUserdata = require(global.lib_path + '/auth/validate/index');

var BadPassword = 'TPfEidnsin';
var GoodPassword = 'Hif43lskf';

var BadEmail = 'noatsymbol';
var GoodEmail = 'user@domain.com';

var BadUser = 'resu';
var GoodUser = 'testuser';

describe('UserData validation', function() {

  var userdata;
  beforeEach(function() {
    userdata = {
      email: GoodEmail,
      password: GoodPassword,
      username: GoodUser
    };
  });

  it('Confirm no error when validation passes', function(done) {
    validateUserdata(userdata, function(err, data){
      expect(err).to.be.null;
      expect(data).to.deep.equal(userdata);
      done();
    });
  });

  it('Returns error when validation fails', function(done) {
    userdata.email = BadEmail;
    validateUserdata(userdata, function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.be.null;
      expect(err).to.be.an('Array');
      expect(err).to.contain('Email Validation Failed');
      expect(err.length).to.equal(1);
      done();
    });
  });

  it('Returns error when validation fails', function(done) {
    userdata.password = BadPassword;
    validateUserdata(userdata, function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.be.null;
      expect(err).to.be.an('Array');
      expect(err).to.contain('Password Validation Failed');
      expect(err.length).to.equal(1);
      done();
    });
  });

  it('Returns error when validation fails', function(done) {
    userdata.username = BadUser;
    validateUserdata(userdata, function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.be.null;
      expect(err).to.be.an('Array');
      expect(err).to.contain('Username Validation Failed');
      expect(err.length).to.equal(1);
      done();
    });
  });
});
