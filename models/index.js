const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGO_DB
  ? process.env.MONGO_DB
  : 'mongodb://mongo:27017';

const models = {
  mongoose: mongoose,
  url: mongoURL,
  user: require('./user.model')(mongoose),
  profile: require('./profile.model')(mongoose),
};

module.exports = models;
