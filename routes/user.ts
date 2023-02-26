import { User } from '../entities/user.entity';
import { myDataSource } from '../data-source';
import { getToken } from '../utils';
const express = require('express');
const app = express.Router();

// login user
app.post('/', async function (req, res) {
  try {
    const request = req.body;

    const user = await myDataSource
      .getRepository(User)
      .findOneBy({ address: request.address });

    const rows = await myDataSource.getRepository(User).count({ take: 1 });

    if (user?._id && rows < 2) {
      const tokens = await getToken(user.address);

      return res.send(tokens);
    }

    if (rows < 1) {
      const newUser = myDataSource
        .getRepository(User)
        .create({ address: request.address });

      await myDataSource.getRepository(User).save(newUser);

      const tokens = await getToken(request.address);

      return res.send(tokens);
    }

    return res.sendStatus(403);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
