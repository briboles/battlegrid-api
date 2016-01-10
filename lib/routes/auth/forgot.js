'use strict';

module.exports = forgotRoutes;

function forgotRoutes(app, passport) {

  app.post('/forgot', function(req, res) {
    res.send('Forgot Password route');
  });
  
}
