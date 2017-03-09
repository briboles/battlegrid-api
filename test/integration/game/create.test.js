'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var io = require('socket.io-client');
var querystring = require('querystring');
var http = require('http');
var User = require('../../../lib/models/user.model');
var serverUrl = 'http://127.0.0.1';
var port = 13101;

// Create http agent
var socketAgent = new http.Agent({ keepAlive: true});

var testUser = {
  username: 'testUser3243',
  email: 'email@athingy.com',
  password: 'Ab34!nfiee',
  name: 'Test User'
};

var postData = querystring.stringify({
  username: testUser.username,
  password: testUser.password
});

var sessionCookie;

describe('Test Socket IO API endpoints',function() {
  this.timeout(4000);
  var newUserId;

  before(function(done) {
    require('../../../lib/server.create');
    var req = http.request({
      hostname: '127.0.0.1',
      port: port,
      method: 'POST',
      path: '/login',
      agent: socketAgent,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    },function(res){

      sessionCookie = res.headers['set-cookie'][0];
      sessionCookie = sessionCookie.replace(/HttpOnly/, '');

      res.setEncoding('utf8');
      res.on('data', function(){
        // Nothing to do here...
      });
      res.on('end', function(){
        return done();
      })
    });


    var newUser = new User(testUser);
    newUser.password = newUser.generateHash(testUser.password);
    newUser.save(function (err, newUser) {
      if (err) throw err;
      newUserId = newUser._id;
      req.write(postData);
      req.end()
    });
  });

  it('Should connect to through socket and fail to authenticate.', function(done) {

    var socket = io.connect(serverUrl+':'+port);
    var authFailed = sinon.spy();

    socket.once('connect', function(){
      socket.emit('CreateNewGame');
    });

    socket.on('Authentication Failed', function() {
      authFailed();
      socket.disconnect();
    });

    socket.on('disconnect', function(){
      expect(authFailed).to.be.called;
      done();
    });

  });

  it('Should connect to through socket and create new game.', function(done) {

    var socket = io.connect(serverUrl+':'+port, {
      agent: socketAgent,
      extraHeaders: {
        'Cookie': sessionCookie
      }
    });

    var notCalled = sinon.spy();

    socket.once('connect', function(){
      socket.emit('CreateNewGame');
    });

    socket.on('GameCreated', function(data){
      expect(data).to.contain.key('id');
      expect(data.id).to.be.a.string;
      console.log(data)
      socket.disconnect();
    });

    socket.on('Authentication Failed', function() {
      notCalled();
    })

    socket.on('disconnect', function(){
      expect(notCalled).to.not.be.called;
      done();
    });

  });

  after(function(){
    User.findOneAndRemove({ _id: newUserId }, function(err) {
      if (err) return new Error(err);
    });
  });
});
