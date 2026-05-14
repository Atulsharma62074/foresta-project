var models = require('../models');
var Tender = models.Tender;

// GET /api/v1/tenders
exports.getAll = async function(req, res, next) {
  try {
    var page   = req.query.page   || 1;
    var limit  = req.query.limit  || 20;
    var filter = req.query.filter;
    var search = req.query.search;
    var status = req.query.status;

    var query = {};
    if (status) query.status = status;
    if (search) query['$text'] = { '$search': search };
    if (filter === 'paper')      query.title = { '$regex': 'paper', '$options': 'i' };
    if (filter === 'stationery') query['$or'] = [{ title: /statione/i }, { title: /notebook/i }, { title: /register/i }];
    if (filter === 'open')       query.endDate = { '$gte': new Date() };

    var total   = await Tender.countDocuments(query);
    var tenders = await Tender.find(query)
      .sort({ endDate: 1, isNew: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    var now = Date.now();
    var enriched = tenders.map(function(t) {
      var daysLeft = t.endDate ? Math.ceil((new Date(t.endDate) - now) / 86400000) : null;
      return Object.assign({}, t, { daysLeft: daysLeft });
    });

    res.json({
      success: true,
      data: enriched,
      pagination: {
        total: total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) { next(err); }
};

// GET /api/v1/tenders/stats
exports.getStats = async function(req, res, next) {
  try {
    var now = new Date();
    var closingDeadline = new Date(now.getTime() + 5 * 86400000);

    var results = await Promise.all([
      Tender.countDocuments(),
      Tender.countDocuments({ endDate: { '$gte': now, '$lte': closingDeadline } }),
      Tender.aggregate([{ '$group': { '_id': null, total: { '$sum': '$value' } } }])
    ]);

    var total      = results[0];
    var closing    = results[1];
    var totalValue = results[2];
    var tvAmount   = (totalValue.length > 0 && totalValue[0].total) ? totalValue[0].total : 0;

    res.json({ success: true, data: { total: total, closing: closing, totalValue: tvAmount } });
  } catch (err) { next(err); }
};

// POST /api/v1/tenders  (admin)
exports.create = async function(req, res, next) {
  try {
    var tender = await Tender.create(req.body);
    res.status(201).json({ success: true, data: tender });
  } catch (err) { next(err); }
};

// PUT /api/v1/tenders/:id  (admin)
exports.update = async function(req, res, next) {
  try {
    var tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tender) {
      return res.status(404).json({ success: false, message: 'Tender not found' });
    }
    res.json({ success: true, data: tender });
  } catch (err) { next(err); }
};

// DELETE /api/v1/tenders/:id  (admin)
exports.remove = async function(req, res, next) {
  try {
    await Tender.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Tender deleted' });
  } catch (err) { next(err); }
};

// POST /api/v1/tenders/sync  (admin)
exports.syncDemo = async function(req, res, next) {
  try {
    var now = new Date();
    function fu(d) { return new Date(now.getTime() + d * 86400000); }

    var demoTenders = [
      { gemId: 'GEM/2026/B/4891234', title: 'Supply of A4 Copier Paper 75 GSM', org: 'Ministry of Education', state: 'Delhi', quantity: 5000, unit: 'Ream', value: 1100000, startDate: fu(-1), endDate: fu(4), category: 'Paper & Stationery', isNew: true },
      { gemId: 'GEM/2026/B/4892011', title: 'Office Stationery & Paper Products', org: 'Indian Railways', state: 'Uttar Pradesh', quantity: 200, unit: 'Box', value: 850000, startDate: fu(-2), endDate: fu(8), category: 'Stationery', isNew: false },
      { gemId: 'GEM/2026/B/4893450', title: 'A4 White Paper 80 GSM for Printing', org: 'AIIMS Hospital', state: 'Bihar', quantity: 10000, unit: 'Ream', value: 2200000, startDate: fu(-3), endDate: fu(2), category: 'Copier Paper', isNew: false },
      { gemId: 'GEM/2026/B/4894112', title: 'Bond Paper 90 GSM for Official Correspondence', org: 'District Collectorate', state: 'Maharashtra', quantity: 1500, unit: 'Ream', value: 480000, startDate: fu(0), endDate: fu(12), category: 'Bond Paper', isNew: true },
      { gemId: 'GEM/2026/B/4895007', title: 'Printing Paper A3 & A4 Bulk Supply', org: 'Govt of Bihar', state: 'Bihar', quantity: 20000, unit: 'Ream', value: 4500000, startDate: fu(-1), endDate: fu(15), category: 'Printing Paper', isNew: true }
    ];

    var synced = 0;
    for (var i = 0; i < demoTenders.length; i++) {
      await Tender.findOneAndUpdate(
        { gemId: demoTenders[i].gemId },
        demoTenders[i],
        { upsert: true, new: true }
      );
      synced++;
    }
    res.json({ success: true, message: 'Synced ' + synced + ' tenders' });
  } catch (err) { next(err); }
};
