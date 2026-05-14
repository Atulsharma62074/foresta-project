var models       = require('../models');
var Inquiry      = models.Inquiry;
var emailService = require('../services/email.service');
var logger       = require('../utils/logger');

// POST /api/v1/inquiries  (public)
exports.create = async function(req, res, next) {
  try {
    var name     = req.body.name;
    var email    = req.body.email;
    var phone    = req.body.phone;
    var company  = req.body.company;
    var product  = req.body.product;
    var quantity = req.body.quantity;
    var message  = req.body.message;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    var inquiry = await Inquiry.create({
      name: name, email: email, phone: phone,
      company: company, product: product,
      quantity: quantity, message: message,
      ip: req.ip
    });

    // Non-blocking email
    emailService.sendInquiryNotification(inquiry).catch(function(err) {
      logger.warn('Email notification failed: ' + err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: { id: inquiry._id }
    });
  } catch (err) { next(err); }
};

// GET /api/v1/inquiries  (admin)
exports.getAll = async function(req, res, next) {
  try {
    var page   = req.query.page  || 1;
    var limit  = req.query.limit || 20;
    var status = req.query.status;
    var filter = status ? { status: status } : {};

    var total     = await Inquiry.countDocuments(filter);
    var inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('assignedTo', 'name email')
      .lean();

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) { next(err); }
};

// PATCH /api/v1/inquiries/:id  (admin)
exports.update = async function(req, res, next) {
  try {
    var updates = {};
    if (req.body.status)     updates.status     = req.body.status;
    if (req.body.notes)      updates.notes      = req.body.notes;
    if (req.body.assignedTo) updates.assignedTo = req.body.assignedTo;

    var inquiry = await Inquiry.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: inquiry });
  } catch (err) { next(err); }
};
