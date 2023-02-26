import { Profile } from '../entities/profile.entity';
import { myDataSource } from '../data-source';
import { verifyToken } from '../utils';
const express = require('express');
const app = express.Router();

// get profile
app.get('/', async function (req, res) {
  try {
    const results = await myDataSource.getRepository(Profile).find();

    return res.json(results[0]);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// create profile
app.put('/', async function (req, res) {
  try {
    const request = req.body;

    const rows = await myDataSource.getRepository(Profile).count({ take: 1 });

    if (rows < 1) {
      const profile = myDataSource.getRepository(Profile).create(request);
      await myDataSource.getRepository(Profile).save(profile);

      return res.sendStatus(201);
    }

    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// update profile
app.post('/', async function (req, res) {
  try {
    const verified = await verifyToken(req);
    const request = req.body;

    if (verified === request.did) {
      const profile = await myDataSource.getRepository(Profile).findOneBy({
        did: request.did,
      });

      myDataSource.getRepository(Profile).merge(profile, request);
      await myDataSource.getRepository(Profile).save(profile);

      return res.sendStatus(201);
    }

    return res.sendStatus(403);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
