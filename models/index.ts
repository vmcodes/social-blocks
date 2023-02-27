const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const models = {
  mongoose: mongoose,
  url: 'mongodb://mongo:m0ng02023!!@54.159.123.111:27017',
  user: require('./user.model')(mongoose),
  profile: require('./profile.model')(mongoose),
};

module.exports = models;
