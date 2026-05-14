var jwt    = require('jsonwebtoken');
var models = require('../models');
var User   = models.User;

exports.protect = async function(req, res, next) {
  try {
    var token = null;
    var authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    var user    = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

exports.authorize = function() {
  var roles = Array.prototype.slice.call(arguments);
  return function(req, res, next) {
    if (roles.indexOf(req.user.role) === -1) {
      return res.status(403).json({
        success: false,
        message: 'Role \'' + req.user.role + '\' is not authorized'
      });
    }
    next();
  };
};
