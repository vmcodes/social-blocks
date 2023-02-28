const express = require('express');
const { verifyToken } = require('../utils');
const model = require('../models');
const Profile = model.profile;
const app = express.Router();

// get account
app.post('/', async function (req, res) {
  try {
    const request = req.body;

    const profile = await Profile.findOne({ address: request.address });

    return res.json(profile);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// get profile
app.get('/:slug', async function (req, res) {
  try {
    const request = req.params['slug'];

    const profile = await Profile.findOne({ slug: request });

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

    const profile = await Profile.findOne({ address: request.address });

    if (profile?.address === request.address) {
      return res.sendStatus(200);
    }

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
app.patch('/', async function (req, res) {
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
