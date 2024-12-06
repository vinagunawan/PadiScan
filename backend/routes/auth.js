const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/register', (req, res) => {
  const { nama, email, password } = req.body;
  User.register(nama, email, password, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.login(email, password, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!result.success) {
      res.status(401).json({ message: result.message });
    } else {
      res.json({ message: 'Login successful', user: result.user });
    }
  });
});

module.exports = router;
