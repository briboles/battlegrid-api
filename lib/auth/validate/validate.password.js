'use strict';

module.exports = validatePassord;

function validatePassord(password) {

  if (typeof password !== 'string') {
    return false;
  }

  var validity = true;

  // Password must be between 8-40 characters.
  if (password.length < 8 || password.length > 40) {
    validity = false;
  }

  // Password must contain at least 1 capital letter.
  if (!password.match(/[A-Z]/)) {
    validity = false;
  }

  // Password must contain at least 1 lowercase letter.
  if (!password.match(/[a-z]/)) {
    validity = false;
  }

  // Password must contain at least 1 number.
  if (!password.match(/[0-9]/)) {
    validity = false;
  }

  return validity;

}
