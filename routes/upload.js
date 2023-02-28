const express = require('express');
const app = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const FormData = require('form-data');
const pinataToken = process.env.PINATA_JWT ? process.env.PINATA_JWT : '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../temp/`));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/', upload.single('file'), async function (req, res) {
  try {
    const fileName = req.file.originalname;
    const filePath = path.join(__dirname, `../temp/${fileName}`);

    const formData = new FormData();

    const file = fs.createReadStream(filePath);
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const configs = {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${pinataToken}`,
      },
    };

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      configs,
    );

    fs.unlinkSync(filePath);

    res.send(response.data.IpfsHash);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
