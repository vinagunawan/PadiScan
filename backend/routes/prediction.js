const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const { User, PenyakitPadi, RiwayatPrediksi } = require('../models');
const router = express.Router();

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      console.log('Uploads folder does not exist. Creating...');
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint untuk menerima file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  const { id_user } = req.body; // Ambil id_user dari request body

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!id_user) {
    return res.status(400).json({ message: 'id_user is required' });
  }

  // Periksa apakah id_user valid
  try {
    const user = await User.findOne({ where: { id_user: id_user } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('File uploaded:', req.file.path);

    // Kirim file gambar ke Flask untuk prediksi
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    console.log('Sending file to Flask API for prediction...');

    // Mengirim file ke server Flask untuk prediksi
    const response = await axios.post('http://localhost:5002/predict', formData, {
      headers: formData.getHeaders(),
    });

    console.log('Prediction response:', response.data);

    const prediction = response.data.prediction;

    // Cari penyakit berdasarkan hasil prediksi
    const penyakitData = await PenyakitPadi.findOne({
      where: { nama_penyakit: prediction },
    });

    if (!penyakitData) {
      return res.status(404).json({ message: 'Penyakit tidak ditemukan' });
    }

    // Simpan riwayat prediksi ke database
    const riwayatPrediksi = await RiwayatPrediksi.create({
      image_path: req.file.path, // Simpan path file gambar yang diupload
      hasil_prediksi: prediction, // Simpan hasil prediksi
      penanganan: penyakitData.penanganan, // Simpan penanganan penyakit
      tanggal_prediksi: new Date(), // Simpan waktu prediksi
      id_user: id_user, // ID pengguna yang melakukan prediksi
      id_penyakit: penyakitData.id_penyakit, // ID penyakit yang sesuai dengan hasil prediksi
    });

    // Kirim respons termasuk prediksi dan detail penyakit
    res.status(200).json({
      prediction: prediction,
      deskripsi: penyakitData.deskripsi,
      penanganan: penyakitData.penanganan,
    });

  } catch (error) {
    console.error('Error during prediction request:', error.message);
    res.status(500).json({ message: 'Error in prediction API', error: error.message });
  }
});

module.exports = router;
