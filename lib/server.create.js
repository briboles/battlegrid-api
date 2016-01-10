// -------------------------------
//        Setup WebServer
// -------------------------------

// Define global path variables
global.lib_path = __dirname;

// Require Modules
var express = require('express');
var serverInit = require('./server.init');

// Server Setup
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Configure Server
serverInit(app,io);

var port = process.env.NODE_PORT || 13001;

server.listen(port);
console.log('Server running on port '+port);
