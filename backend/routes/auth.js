const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, dan password wajib diisi!' });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Cek apakah username sudah terdaftar
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Kembalikan respons sukses
    res.status(201).json({
      message: 'User berhasil didaftarkan',
      user: {
        id_user: newUser.id_user,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);  // Tampilkan error secara rinci di terminal
    res.status(500).json({ message: 'Error registering user', error: err.message }); // Mengembalikan pesan error lebih rinci
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid password' });
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
