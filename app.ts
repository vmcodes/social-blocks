import * as express from 'express';
import { myDataSource } from './data-source';
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// create and setup express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('build'));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);

app.get('*', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

module.exports = app;
