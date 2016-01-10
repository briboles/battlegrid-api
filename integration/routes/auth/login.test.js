'use strict';

var request = require('supertest');
var app = require('../../../lib/server.create');
var User = require('../../../lib/models/user.model');

var testUser = {
  username: 'testUser3243',
  email: 'email@athingy.com',
  password: 'Ab34!nfiee',
  name: 'Test User'
};

describe('Guest Sign Up Route', function() {

  var newUserId;

  before(function(done) {
    var newUser = new User(testUser);
    newUser.password = newUser.generateHash(testUser.password);
    newUser.save(function (err, newUser) {
      if (err) throw err;
      newUserId = newUser._id;
      return done();
    });
  });

  it('Creates New User.', function(done) {
    request(app)
      .post('/login')
      .send(testUser)
      .expect(200, done);
  });

  after(function(){
    User.findOneAndRemove({ _id: newUserId }, function(err) {
      if (err) return new Error(err);
    });
  });

});
