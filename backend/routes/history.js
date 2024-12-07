const express = require('express');
const { PredictionHistory, PenyakitPadi } = require('../models');
const router = express.Router();

// Melihat riwayat prediksi pengguna
router.get('/history', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  PredictionHistory.findAll({
    where: { id_user: req.session.userId },
    include: [PenyakitPadi], // Menampilkan informasi penyakit terkait
    order: [['tanggal_prediksi', 'DESC']]
  })
    .then(riwayat => {
      res.json(riwayat);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve prediction history' });
    });
});

module.exports = router;
