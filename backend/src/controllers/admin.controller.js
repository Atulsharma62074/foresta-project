var models   = require('../models');
var User     = models.User;
var Product  = models.Product;
var Tender   = models.Tender;
var Inquiry  = models.Inquiry;
var AdminLog = models.AdminLog;

// GET /api/v1/admin/dashboard
exports.dashboard = async function(req, res, next) {
  try {
    var now   = new Date();
    var month = new Date(now.getFullYear(), now.getMonth(), 1);

    var results = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Tender.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ createdAt: { '$gte': month }, status: 'new' }),
      Tender.countDocuments({ endDate: { '$gte': now } }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers:     results[0],
          totalProducts:  results[1],
          totalTenders:   results[2],
          totalInquiries: results[3],
          newInquiries:   results[4],
          openTenders:    results[5]
        },
        recentInquiries: results[6]
      }
    });
  } catch (err) { next(err); }
};

// GET /api/v1/admin/users
exports.getUsers = async function(req, res, next) {
  try {
    var page  = req.query.page  || 1;
    var limit = req.query.limit || 20;
    var total = await User.countDocuments();
    var users = await User.find()
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      data: users,
      pagination: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) { next(err); }
};

// PATCH /api/v1/admin/users/:id
exports.updateUser = async function(req, res, next) {
  try {
    var updates = {};
    if (req.body.role     !== undefined) updates.role     = req.body.role;
    if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;

    var user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

// GET /api/v1/admin/logs
exports.getLogs = async function(req, res, next) {
  try {
    var page  = req.query.page  || 1;
    var limit = req.query.limit || 50;
    var total = await AdminLog.countDocuments();
    var logs  = await AdminLog.find()
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('user', 'name email')
      .lean();

    res.json({
      success: true,
      data: logs,
      pagination: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) { next(err); }
};
