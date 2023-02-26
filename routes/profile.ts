import * as express from 'express';
import { verifyToken } from '../utils';
const model = require('../models');
const Profile = model.profile;
const app = express.Router();

// get profile
app.get('/', async function (req, res) {
  try {
    const request = req.params;

    const profile = await Profile.findOne({ username: request });

    return res.json(profile);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// create profile
app.put('/', async function (req, res) {
  try {
    const request = req.body;

    const newProfile = new Profile({
      ...request,
    });

    await newProfile.save();

    return res.sendStatus(201);
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

    if (verified === request.address) {
      await Profile.updateOne({ ...request });

      return res.sendStatus(201);
    }

    return res.sendStatus(403);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
