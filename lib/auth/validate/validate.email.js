'use strict';

module.exports = validateEmail;

function validateEmail(email) {

  if (typeof email !== 'string') {
    return false;
  }

  var validity = true;

  // Confirm @ symbol present in email string.
  if (!email.match(/@/)) {
    validity = false;
  }

  return validity;
}
