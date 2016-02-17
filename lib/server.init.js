'use strict';

var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('./auth/passport.init');
var routes = require('./routes/index');
var gameLogic = require('./game');

// Connect to mongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/battleship');

// Configure Sessions
var sessionOptions = {
  secret: "battleface",
  saveUninitialized: false,
  resave: false,
  cookie: { httpOnly: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
};
var expressSession = session(sessionOptions);

function serverInit(app, io) {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  io.use(function(socket,next){
    //console.log(socket.request.res)
    expressSession(socket.request, socket.request.res, next);
  });

  // Session / Auth Middleware
  app.use(expressSession);
  app.use(passport.initialize());
  app.use(passport.session());

  // Socket routes
  gameLogic(io);

  // Route Handler
  routes(app, passport);

}

module.exports = serverInit;
