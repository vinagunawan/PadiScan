const express = require('express');
const { RiwayatPrediksi, PenyakitPadi } = require('../models');
const router = express.Router();

router.get('/history', async (req, res) => {
  try {
    const history = await RiwayatPrediksi.findAll({
      include: ['User'], 
      order: [['tanggal_prediksi', 'DESC']] 
    });
    res.status(200).json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;
