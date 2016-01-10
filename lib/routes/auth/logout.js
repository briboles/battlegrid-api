'use strict';

module.exports = logoutRoute;

function logoutRoute(app) {
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
