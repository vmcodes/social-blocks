import * as express from 'express';
const app = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

app.get('/login', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

app.get('/account/:address', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

app.get('/:slug', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

module.exports = app;
