const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const PenyakitPadi = require('../models/penyakitPadi');
const router = express.Router();

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Tentukan folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});
const upload = multer({ storage: storage });

// Route untuk menerima gambar dan mengirim ke Flask
router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imagePath = path.join(__dirname, '../uploads', req.file.filename);

    // Kirim gambar ke Flask untuk prediksi
    const response = await axios.post('http://localhost:5000/predict', {
      imagePath: imagePath,
    });

    // Mengambil hasil prediksi dari Flask
    const predictionResult = response.data.result;

    // Mendapatkan informasi penyakit padi dari database berdasarkan hasil prediksi
    const penyakit = await PenyakitPadi.findOne({
      where: {
        nama_penyakit: predictionResult,
      },
    });

    // Mengirimkan hasil prediksi dan penanganan penyakit padi
    res.json({
      prediction: predictionResult,
      deskripsi: penyakit ? penyakit.deskripsi : 'Deskripsi tidak ditemukan',
      penanganan: penyakit ? penyakit.penanganan : 'Penanganan tidak ditemukan',
    });

    // Hapus gambar setelah diproses
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
