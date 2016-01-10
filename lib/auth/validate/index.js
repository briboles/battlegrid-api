'use strict';

var validateEmail = require('./validate.email');
var validateUser = require('./validate.user');
var validatePassword = require('./validate.password');

module.exports = validate;

function validate(userdata, callback) {

  var error = [];

  if (!validateUser(userdata.username)) {
    error.push('Username Validation Failed');
  }

  if (!validateEmail(userdata.email)) {
    error.push('Email Validation Failed');
  }

  if (!validatePassword(userdata.password)) {
    error.push('Password Validation Failed');
  }

  if (error.length > 0) {
    callback(error, null);
  }
  else {
    callback(null, userdata);
  }
}
