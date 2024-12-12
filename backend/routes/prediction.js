const express = require('express');
const multer = require('multer');
const axios = require('axios');
const { RiwayatPrediksi } = require('../models'); // Model untuk menyimpan riwayat prediksi
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Kirim gambar ke Flask untuk prediksi
    const response = await axios.post('http://localhost:5000/predict', { image: req.file.buffer });

    const { prediction } = response.data;
    
    // Simpan riwayat prediksi ke database
    const newPrediction = await RiwayatPrediksi.create({
      image_path: imagePath,
      hasil_prediksi: prediction
    });

    res.status(200).json({ message: 'Prediction successful', prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error making prediction' });
  }
});

module.exports = router;
