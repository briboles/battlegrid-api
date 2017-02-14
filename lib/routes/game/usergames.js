'use strict';

module.exports = userGames;

var isAuth = require(global.lib_path+'/auth/isAuth.middleware');
var Game = require(global.lib_path+'/models/game.model');

function userGames(app, passport) {

  app.get('/mygames', isAuth, function(req, res) {

    var userId = req.session.passport.user;
    var completed = (req.query.completed === 'true');
    var query = {
      completed: completed,
      $or: [
        {'player1.username': userId },
        {'player2.username': userId }
      ]
    };

    var q = Game.find(query).select('private started completed player1.username player1.hitNum player1.gameWon player2.username player2.hitNum player2.gameWon ');
    // oddly requires 2 populate statememts to return username and user ID ref...
    // TODO: Why come that???
    q.populate('player1.username', 'username')
     .populate('player1.username', 'username')
     .exec(function (err, game) {
       var response = {
         id: userId,
         games: game
       };
      res.send(response);
    });
  });

}
