var app       = require('./app');
var connectDB = require('./config/db');
var logger    = require('./utils/logger');
require('dotenv').config();

var PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, function() {
      logger.info('Foresta Backend running on port ' + PORT + ' [' + process.env.NODE_ENV + ']');
    });
  } catch (err) {
    logger.error('Failed to start server: ' + err.message);
    process.exit(1);
  }
}

process.on('SIGTERM', function() {
  logger.info('SIGTERM received - shutting down gracefully');
  process.exit(0);
});

start();
