const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Model User
const session = require('express-session');
const router = express.Router();

// Pengaturan sesi untuk menyimpan status login
router.use(session({
  secret: 'yourSecretKey',  // Ganti dengan secret key yang lebih kuat
  resave: false,
  saveUninitialized: true,
}));

// Registrasi Pengguna
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    // Periksa format email (simple validation)
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email tidak valid!' });
    }

    // Periksa apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Periksa apakah username sudah terdaftar
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Kirimkan response sukses
    res.status(201).json({
      message: 'User berhasil didaftarkan',
      user: {
        id_user: newUser.id_user,
        username: newUser.username,
        email: newUser.email,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
});

// Login Pengguna
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email tidak terdaftar' });
    }

    // Periksa apakah password cocok dengan yang ada di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Menyimpan informasi pengguna ke dalam sesi
    req.session.userId = user.id_user;
    req.session.username = user.username;
    
    res.status(200).json({ message: 'Login berhasil', user: { username: user.username, email: user.email } });
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

// Logout Pengguna
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat logout' });
    }
    res.status(200).json({ message: 'Logout berhasil' });
  });
});

module.exports = router;
