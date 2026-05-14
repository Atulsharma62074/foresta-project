var express     = require('express');
var helmet      = require('helmet');
var cors        = require('cors');
var compression = require('compression');
var morgan      = require('morgan');
var rateLimit   = require('express-rate-limit');
require('dotenv').config();

var logger = require('./utils/logger');

// Routes
var authRoutes    = require('./routes/auth.routes');
var productRoutes = require('./routes/product.routes');
var tenderRoutes  = require('./routes/tender.routes');
var inquiryRoutes = require('./routes/inquiry.routes');
var adminRoutes   = require('./routes/admin.routes');

var app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// ── Global Rate Limit ─────────────────────────────────
var limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message:  { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Body Parsing & Compression ────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// ── Logging ───────────────────────────────────────────
app.use(morgan('combined', {
  stream: {
    write: function(msg) { logger.info(msg.trim()); }
  }
}));

// ── Health Check ──────────────────────────────────────
app.get('/health', function(req, res) {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// ── API Routes ────────────────────────────────────────
app.use('/api/v1/auth',      authRoutes);
app.use('/api/v1/products',  productRoutes);
app.use('/api/v1/tenders',   tenderRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/admin',     adminRoutes);

// ── 404 Handler ───────────────────────────────────────
app.use(function(req, res) {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler ──────────────────────────────
app.use(function(err, req, res, next) {
  var status  = err.status || 500;
  var message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  logger.error(status + ' - ' + err.message + ' - ' + req.originalUrl);
  res.status(status).json({ success: false, message: message });
});

module.exports = app;
