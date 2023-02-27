import * as express from 'express';
const db = require('./models');
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const uploadRouter = require('./routes/upload');

async function mongoStart() {
  db.mongoose.set('strictQuery', false);

  await db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to mongo');
    })
    .catch((err) => {
      console.log('error connecting to the database:', err);
      process.exit();
    });
}

// establish database connection
mongoStart();

// create and setup express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('build'));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/upload', uploadRouter);

app.get('*', function (req, res, next) {
  res.sendFile('build/index.html', { root: '.' });
});

module.exports = app;
