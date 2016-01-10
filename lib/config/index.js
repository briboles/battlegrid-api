'use strict';

module.exports = config;

var config;
var env = process.env.NODE_ENV;

if (env in ['dev, test, prod, jenkins']) {
  config = require('./' + env + '.config');
}
else {
  config = require('./local.config');
}
