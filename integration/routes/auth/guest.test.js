'use strict';

var request = require('supertest');
var app = require('../../../lib/server.create');
var User = require('../../../lib/models/user.model');

describe('Guest Sign Up Route', function() {

  var newUserId;

  it('Creates New User.', function(done) {
    request(app)
      .post('/guest')
      .expect(function(res) {
        newUserId = res.body.data._id;
      })
      .expect(200, done);
  });

  after(function(){
    User.findOneAndRemove({ _id: newUserId }, function(err) {
      if (err) return new Error(err);
    });
  });

});
