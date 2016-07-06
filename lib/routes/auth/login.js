'use strict';

module.exports = loginRoute;

function loginRoute(app, passport) {
  app.get('/login', function(req, res) {
    res.send('this is a message');
  });

  app.post('/login', authenticate);

  function authenticate (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        // User Login Failed
        return res.status(401).send({ "success": false, "error": 'Authentication Failed.'});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        var redirectUrl = req.session.returnTo || '#/';
        return res.status(200).send({ "success": true, "redirectUrl": redirectUrl });
      });
    })(req, res, next);
  }
}
