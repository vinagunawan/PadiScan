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

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});