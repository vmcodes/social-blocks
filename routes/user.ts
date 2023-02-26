import * as express from 'express';
import { getToken } from '../utils';
const model = require('../models');
const User = model.user;
const app = express.Router();

// login user
app.post('/', async function (req, res) {
  try {
    const request = req.body;

    const user = await User.findOne({ address: request.address });

    if (user?.address === request.address) {
      const tokens = await getToken(user.address);

      return res.send(tokens);
    }

    const newUser = new User({
      address: request.address,
    });

    await newUser.save();

    const tokens = await getToken(request.address);

    return res.send(tokens);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
