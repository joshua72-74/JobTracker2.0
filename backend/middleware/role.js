module.exports = function(allowedRoles) {
  return function(req, res, next) {
    // Check if user info exists and role is allowed
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};
