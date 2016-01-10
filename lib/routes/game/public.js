'use strict';

module.exports = publicGames;

var Game = require(global.lib_path+'/models/game.model');

function publicGames(app) {

  app.get('/publicgames', function(req,res) {

    var query = {
    	completed: false,
      gamefull: false,
      private: false
    };

    var q = Game.find(query).select('player1.username created');
    q.populate('player1.username', 'username')
     .exec(function (err, game) {
      res.send(game);
    });
  });

}
