'use strict';

module.exports = guestUserRoutes;

var User = require(global.lib_path+'/models/user.model');

// Endpoints related to creating a guest user.
function guestUserRoutes(app, passport) {

  app.post('/guest', createGuest);

  function createGuest(req, res, next) {
    User.count({}, function (err, count){
      var guest = 'guest'+(count+1);
      var password = make_passwd(13);

      var userData = {
        username: guest,
        email: '',
        password: password,
        name: guest,
        guest: true
      };

      var newUser = new User(userData);

      newUser.password = newUser.generateHash(userData.password);
      newUser.save(function (err, newUser) {
        if (err) throw err;
        else{
          req.logIn(newUser, function(err) {
            if (err) return next(err);
            var response = {
              success: true,
              redirectUrl: "/#/create",
              username: newUser.username,
              id: newUser._id
            };
            return res.status(200).send(response);
          });
        }
      });
    });
  }

  function make_passwd(n) {
    var a = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    var index = (Math.random() * (a.length - 1)).toFixed(0);
    return n > 0 ? a[index] + make_passwd(n - 1) : '';
  }
}
