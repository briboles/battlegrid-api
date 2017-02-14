
var Game = require('./gamedata');
var User = require(global.lib_path+'/models/user.model');
var GameState = require(global.lib_path+'/models/game.model');

module.exports = function(socket) {

  socket.on('CreateNewGame', function(){
    // Confirm there is an active login session and create game
    var id = socket && socket.request && socket.request.session && socket.request.session.passport && socket.request.session.passport.user;

    if (!id) {
      socket.emit('Authentication Failed');
    }
    else {
      var gameinit = new Game(id);
      var game = new GameState(gameinit);

      game.save(function(err, gamedata) {
        if (err) return socket.emit('Error', err);
        socket.emit('GameCreated', { id: gamedata._id, details: gamedata });
      });
    }
  });

};
