const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data'); // Pastikan ini diimpor

const router = express.Router(); // Gunakan Router bukan app

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      console.log('Uploads folder does not exist. Creating...');
      fs.mkdirSync(uploadDir, { recursive: true }); // Pastikan folder ada
    }
    cb(null, uploadDir); // Tentukan folder untuk menyimpan file yang diupload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menamai file yang diupload secara unik
  },
});

// Inisialisasi multer
const upload = multer({ storage: storage });

// Endpoint untuk menerima file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('File uploaded:', req.file.path); // Log file path

  // Kirim file gambar ke Flask sebagai form-data
  const formData = new FormData();
  formData.append('file', fs.createReadStream(req.file.path)); // Mengirimkan file gambar

  // Menambahkan log untuk debugging
  console.log('Sending file to Flask API for prediction...');
  
  axios.post('http://127.0.0.1:5002/predict', { filePath: req.file.path })

    .then(response => {
      console.log('Prediction response:', response.data); // Log response dari Flask API
      res.status(200).json({ prediction: response.data.prediction });
    })
    .catch(error => {
      console.error('Error during prediction request:', error.message); // log error message
      console.error(error); // log full error untuk debugging

      // Pastikan error dikirimkan ke client dengan pesan yang jelas
      res.status(500).json({ message: 'Error in prediction API', error: error.message });
    });
});

// Endpoint untuk melakukan prediksi (misalnya, menggunakan model machine learning)
router.post('/predict', upload.single('file'), (req, res) => {
  if (!filePath) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;

  res.json({ prediction: 'Prediksi berhasil berdasarkan file yang diupload' });
});

// Ekspor router
module.exports = router;
