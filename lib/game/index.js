'use strict';

module.exports = gameLogic;

function gameLogic(io) {

  io.on('connection', function(socket) {
    console.log('connection');

      require('./create')(socket);

  });

  io.on('disconnect', function (data) {
    console.log('Disconnected');
  });

}
