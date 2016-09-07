'use strict';

module.exports = userGames;

var isAuth = require(global.lib_path+'/auth/isAuth.middleware');
var User = require(global.lib_path+'/models/user.model');

function userGames(app, passport) {

  app.get('/auth', isAuth, function(req, res) {

    var userId = req.session.passport.user;

    var query = {
    	_id: userId
    };

    User.findOne(query)
      .exec(function (err, user) {
       var response = {
         id: user._id,
         username: user.username,
         name: user.name,
         email: user.email,
         guest: user.guest
       };
       console.log(user);
      res.send(response);
      });
  });

}
