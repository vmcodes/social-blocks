import * as express from 'express';
const { verifyToken } = require('../utils');
const model = require('../models');
const Profile = model.profile;
const app = express.Router();

// get profile
app.get('/:slug', async function (req, res) {
  try {
    const request = req.params['slug'];

    const profile = await Profile.findOne(
      { slug: request },
      { _id: 0, address: 0, createdAt: 0, updatedAt: 0, __v: 0 },
    );

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

// get account
app.post('/', async function (req, res) {
  try {
    const verified = await verifyToken(req);
    const request = req.body;

    const profile = await Profile.findOne(
      { address: request.address },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 },
    );

    if (verified === request.address) {
      return res.json(profile);
    }

    return res.sendStatus(401);
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

    const slug = await Profile.find({ slug: request.slug });

    if (slug[0] && slug[0].address !== request.address) {
      return res.sendStatus(403);
    }

    if (verified === request.address) {
      await Profile.updateOne(
        { address: verified },
        {
          ...request,
        },
      );

      return res.sendStatus(201);
    }

    return res.sendStatus(401);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
