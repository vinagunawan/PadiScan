const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { User, RiwayatPrediksi } = require('./models');
const session = require('express-session');
const app = express();

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

// Registrasi Pengguna (sudah ada)
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validasi dan simpan pengguna
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User berhasil didaftarkan', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
});

// Login Pengguna (sudah ada)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Proses login dan simpan sesi
    req.session.userId = 123; // Contoh ID pengguna yang login
    res.status(200).json({ message: 'Login berhasil' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

// Endpoint untuk menerima gambar dan mengirimkan prediksi ke model Flask
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Gambar tidak ditemukan!' });
    }

    // Kirim gambar ke API Flask untuk prediksi
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path)); // Kirim file gambar

    const response = await axios.post('http://localhost:5000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = response.data.prediction; // Ambil hasil prediksi

    // Simpan riwayat prediksi
    const userId = req.session.userId;
    const newPrediksi = await RiwayatPrediksi.create({
      image_path: req.file.path,
      hasil_prediksi: result,
      id_user: userId,
    });

    // Kirimkan hasil prediksi dan deskripsi dari database
    const penyakit = await PenyakitPadi.findOne({ where: { nama_penyakit: result } });
    res.status(200).json({
      message: 'Prediksi berhasil',
      prediction: result,
      penanganan: penyakit ? penyakit.penanganan : 'Tidak ada penanganan tersedia',
      deskripsi: penyakit ? penyakit.deskripsi : 'Deskripsi tidak ditemukan',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses gambar' });
  }
});

// Menjalankan server Express
app.listen(3000, () => {
  console.log('Server Express berjalan di port 3000');
});
