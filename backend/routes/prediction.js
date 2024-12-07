const express = require('express');
const multer = require('multer');
const axios = require('axios');
const { RiwayatPrediksi } = require('../models');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const response = await axios.post('http://localhost:5000/predict', {
      image_path: imagePath,
    });
    const { prediction } = response.data;
    const newPrediction = await RiwayatPrediksi.create({ image_path: imagePath, hasil_prediksi: prediction });
    res.status(200).json({ message: 'Prediction successful', prediction: newPrediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error making prediction' });
  }
});

module.exports = router;
