const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
require('./models');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');
const predictionRoutes = require('./routes/prediction');

const app = express();
const port = 5000;

app.use(cors());

// Middleware untuk meng-handle JSON dan URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session untuk login
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Middleware untuk meng-upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// Rute untuk Auth (registrasi dan login)
app.use('/api/auth', authRoutes);

// Rute untuk History (Riwayat prediksi)
app.use('/api/history', historyRoutes);

// Rute untuk Prediction (Prediksi menggunakan model ML)
app.use('/api/prediction', predictionRoutes); 

// Endpoint untuk upload dan prediksi (menggunakan prediction.js)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('File uploaded:', req.file.path);

  // Kirim path file yang diupload ke API prediksi di prediction.js
  axios.post('http://127.0.0.1:5002/predict', { filePath: req.file.path })
    .then(response => {
      res.status(200).json({ prediction: response.data.prediction });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error in prediction API' });
    });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
