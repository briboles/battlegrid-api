'use strict';

module.exports = routeInit;

var glob = require('glob');
var _ = require('lodash');

function routeInit(app, passport) {

  glob(
    __dirname + '/**/*.js',
    { ignore: __dirname + '/index.js' },
    function(err, files) {
      if (err) return;
      _.each(files, function(val, key) {
        require(val)(app, passport);
      });

      // Handle any unhandled requests with a 404 message.
      app.use(function(req, res, next){
        res.status(404).send('404 - Page Not Found');
      });
    });

}
