'use strict';

var request = require('../../startup.test');

describe('Logout Routes', function() {

  it('Logs user out.', function(done) {
    request('get', '/logout', function(req){
      req.expect(302, done);
    })
  });

});
