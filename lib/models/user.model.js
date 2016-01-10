'use strict';

// User Accoount MongoDB Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  createDate: { type: Date, default: Date.now },
  name: String,
  email: String,
  username: String,
  password: String,
  resetPassToken: String,
  resetPassExpire: Date,
  guest: {type: Boolean, default: false }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export the schemas
module.exports = mongoose.model('users', userSchema);
