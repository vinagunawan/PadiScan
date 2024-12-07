const express = require('express');
const multer = require('multer');
const PenyakitPadi = require('../models'); // Mengimpor model PenyakitPadi
const RiwayatPrediksi = require('../models'); // Mengimpor model RiwayatPrediksi
const { exec } = require('child_process');
const path = require('path');
const router = express.Router();

// Setup Multer untuk menyimpan gambar yang diupload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Menerima gambar dan mengirim ke model Machine Learning
router.post('/predict', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  // Panggil model Machine Learning dengan gambar
  exec(`python3 predict.py ${imagePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to process image' });
    }

    // Ambil hasil prediksi
    const hasilPrediksi = stdout.trim();

    // Ambil penanganan penyakit dari database
    PenyakitPadi.findOne({ where: { nama_penyakit: hasilPrediksi } })
      .then(penyakit => {
        if (!penyakit) {
          return res.status(404).json({ error: 'Disease not found' });
        }

        // Simpan riwayat prediksi ke database
        RiwayatPrediksi.create({
          id_user: req.session.userId, // ID user dari session
          image_path: imagePath,
          hasil_prediksi: hasilPrediksi,
          penanganan: penyakit.penanganan
        });

        res.json({
          hasil_prediksi: hasilPrediksi,
          penanganan: penyakit.penanganan,
          deskripsi: penyakit.deskripsi
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve disease info' });
      });
  });
});

module.exports = router;
