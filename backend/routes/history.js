const express = require('express');
const { RiwayatPrediksi, PenyakitPadi } = require('../models');
const router = express.Router();

router.get('/history', async (req, res) => {
  try {
    const history = await RiwayatPrediksi.findAll({
      include: [{ model: PenyakitPadi }],
    });
    res.status(200).json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;
