var mongoose = require('mongoose');
var logger   = require('../utils/logger');

async function connectDB() {
  var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/foresta_db';

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  logger.info('MongoDB connected: ' + mongoose.connection.host);

  mongoose.connection.on('error', function(err) {
    logger.error('MongoDB connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function() {
    logger.warn('MongoDB disconnected');
  });
}

module.exports = connectDB;
