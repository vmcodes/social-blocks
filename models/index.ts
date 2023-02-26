const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const models = {
  mongoose: mongoose,
  url: 'mongodb+srv://admin:VcXKMeV9N6PZoe9J@cluster0.7fwlp3g.mongodb.net/social-blocks',
  user: require('./user.model')(mongoose),
  profile: require('./profile.model')(mongoose),
};

module.exports = models;
