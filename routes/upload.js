const express = require('express');
const app = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, `../temp`) });
const pinataToken = process.env.PINATA_JWT ? process.env.PINATA_JWT : '';

app.post('/', upload.single('file'), async function (req, res) {
  try {
    const fileName = req.file.originalname;

    const formData = new FormData();
    const filePath = `temp/${fileName}`;

    const fileContent = await fs.readFileSync(filePath);
    formData.append('file', fileContent);

    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: pinataToken,
        },
      },
    );

    await fs.unlinkSync(filePath);

    res.send(response.data.IpfsHash);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = app;
