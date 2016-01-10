'use strict';

module.exports = validateUser;

function validateUser(username) {

  if (typeof username !== 'string') {
    return false;
  }

  var validity = true;
  var illegalChars = /\W/;

  // Username was not provided.
  if (username === undefined || username === '') {
    validity = false;
  }

  // Username must be between 5-25 characters.
  if (username.length < 5 || username.length > 25) {
    validity = false;
  }

  // Verify allowed character
  if (illegalChars.test(username)) {
    validity = false;
  }

  return validity;
}
