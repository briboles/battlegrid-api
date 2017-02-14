'use stric';

module.exports = isAuth;

// Middleware function used to confirm if user is authenticated.
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Authentication Failed');
}
