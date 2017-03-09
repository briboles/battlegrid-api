'use strict';

var request = require('supertest');
var app = require('../../lib/server.create');

module.exports = function (method, route, cb) {
  return cb(request(app)[method](route));
};
