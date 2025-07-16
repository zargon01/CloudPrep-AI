// /backend/middleware/roles.middleware.js

/**
 * allowRoles Middleware
 * @param  {...string} roles - list of allowed roles
 * @returns middleware that allows access if req.user.role is in roles
 */
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = allowRoles;
