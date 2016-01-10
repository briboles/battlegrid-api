'use strict';

module.exports = userGames;

var isAuth = require(global.lib_path+'/auth/isAuth.middleware');
var Game = require(global.lib_path+'/models/game.model');

function userGames(app, passport) {

  app.get('/mygames', isAuth, function(req,res) {

    var userId = req.session.passport.user;
    var completed = req.query.completed;
    var query = {
    	completed: completed,
    	$or: [
        {'player1.username': userId },
        {'player2.username': userId }
    	]
    };

    var q = Game.find(query).select('private started completed player1.username player1.hitNum player1.gameWon player2.username player2.hitNum player2.gameWon ');
    q.populate('player1.username', 'username')
     .populate('player1.username', 'username')
     .exec(function (err, game) {
      res.send(game);
    });
  });

}
