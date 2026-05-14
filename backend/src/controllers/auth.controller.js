var jwt    = require('jsonwebtoken');
var models = require('../models');
var User   = models.User;
var logger = require('../utils/logger');

function signAccess(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m'
  });
}

function signRefresh(id) {
  return jwt.sign({ id: id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  });
}

// POST /api/v1/auth/register
exports.register = async function(req, res, next) {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    var company = req.body.company;

    var exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    var user = await User.create({ name: name, email: email, password: password, phone: phone, company: company });
    var accessToken  = signAccess(user._id);
    var refreshToken = signRefresh(user._id);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(201).json({ success: true, data: { user: user, accessToken: accessToken, refreshToken: refreshToken } });
  } catch (err) { next(err); }
};

// POST /api/v1/auth/login
exports.login = async function(req, res, next) {
  try {
    var email = req.body.email;
    var password = req.body.password;

    var user = await User.findOne({ email: email }).select('+password +refreshToken');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    var isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account deactivated' });
    }

    user.lastLogin    = Date.now();
    var accessToken   = signAccess(user._id);
    var refreshToken  = signRefresh(user._id);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    logger.info('Login: ' + email);
    res.json({ success: true, data: { user: user, accessToken: accessToken, refreshToken: refreshToken } });
  } catch (err) { next(err); }
};

// POST /api/v1/auth/refresh
exports.refresh = async function(req, res, next) {
  try {
    var refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token required' });
    }

    var decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    var user    = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    var newAccess  = signAccess(user._id);
    var newRefresh = signRefresh(user._id);
    user.refreshToken = newRefresh;
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, data: { accessToken: newAccess, refreshToken: newRefresh } });
  } catch (err) { next(err); }
};

// POST /api/v1/auth/logout
exports.logout = async function(req, res, next) {
  try {
    var user = await User.findById(req.user._id).select('+refreshToken');
    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) { next(err); }
};

// GET /api/v1/auth/me
exports.me = function(req, res) {
  res.json({ success: true, data: req.user });
};
