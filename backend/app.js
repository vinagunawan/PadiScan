const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cors = require('cors'); // Untuk menangani masalah CORS
const { User, RiwayatPrediksi, PenyakitPadi } = require('./models');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');
const predictionRoutes = require('./routes/prediction');
const app = express();

// Menggunakan CORS (jika frontend dan backend terpisah)
app.use(cors());

// Middleware untuk menerima data JSON dan form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session untuk login
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Middleware untuk mengunggah gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage: storage });

// Rute untuk Auth
app.use('/api/auth', authRoutes); // Rute untuk registrasi dan login

// Rute untuk History (Riwayat Prediksi)
app.use('/api/history', historyRoutes); // Riwayat prediksi

// Rute untuk Prediction (Prediksi Machine Learning)
app.use('/api/prediction', predictionRoutes); // Prediksi penyakit padi

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

