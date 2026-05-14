var models  = require('../models');
var Product = models.Product;

// GET /api/v1/products
exports.getAll = async function(req, res, next) {
  try {
    var page       = req.query.page  || 1;
    var limit      = req.query.limit || 12;
    var category   = req.query.category;
    var search     = req.query.search;
    var gemApproved = req.query.gemApproved;
    var featured   = req.query.featured;

    var filter = {};
    if (category)    filter.category    = category;
    if (gemApproved) filter.gemApproved = (gemApproved === 'true');
    if (featured)    filter.isFeatured  = (featured === 'true');
    if (search)      filter['$text']    = { '$search': search };

    var total    = await Product.countDocuments(filter);
    var products = await Product.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      data: products,
      pagination: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) { next(err); }
};

// GET /api/v1/products/:id
exports.getOne = async function(req, res, next) {
  try {
    var product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

// POST /api/v1/products  (admin)
exports.create = async function(req, res, next) {
  try {
    var slug = '';
    if (req.body.name) {
      slug = req.body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    var data = Object.assign({}, req.body, { slug: slug, createdBy: req.user._id });
    var product = await Product.create(data);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

// PUT /api/v1/products/:id  (admin)
exports.update = async function(req, res, next) {
  try {
    var product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

// DELETE /api/v1/products/:id  (admin)
exports.remove = async function(req, res, next) {
  try {
    var product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};
