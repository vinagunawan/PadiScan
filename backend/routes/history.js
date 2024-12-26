const express = require('express');
const { RiwayatPrediksi, User, PenyakitPadi } = require('../models'); // Import model yang diperlukan
const router = express.Router();

// Endpoint untuk menyimpan riwayat prediksi
router.post('/history', async (req, res) => {
  const { id_user, hasil_prediksi, image_path } = req.body;

  // Validasi input
  if (!id_user || !hasil_prediksi || !image_path) {
    return res.status(400).json({ message: 'id_user, hasil_prediksi, and image_path are required' });
  }

  try {
    // Cari user berdasarkan id_user
    const user = await User.findOne({ where: { id_user } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cari penyakit berdasarkan hasil prediksi
    const penyakitData = await PenyakitPadi.findOne({
      where: { nama_penyakit: hasil_prediksi },
    });

    if (!penyakitData) {
      return res.status(404).json({ message: 'Penyakit tidak ditemukan' });
    }

    // Simpan riwayat prediksi ke database
    const riwayatPrediksi = await RiwayatPrediksi.create({
      image_path, // Simpan path file gambar yang diupload
      hasil_prediksi, // Simpan hasil prediksi
      penanganan: penyakitData.penanganan, // Simpan penanganan penyakit
      tanggal_prediksi: new Date(), // Simpan waktu prediksi
      id_user, // ID pengguna yang melakukan prediksi
      id_penyakit: penyakitData.id_penyakit, // ID penyakit yang sesuai dengan hasil prediksi
    });

    // Kirim respons sukses
    res.status(200).json({
      message: 'Riwayat prediksi berhasil disimpan',
      riwayat_prediksi: riwayatPrediksi,
    });

  } catch (error) {
    console.error('Error saving history:', error.message);
    res.status(500).json({ message: 'Error saving history', error: error.message });
  }
});

// Endpoint untuk mengambil riwayat prediksi berdasarkan id_user
router.get('/:id_user', async (req, res) => {
  const { id_user } = req.params;

  try {
    // Cari semua riwayat prediksi untuk user tertentu
    const riwayatPrediksi = await RiwayatPrediksi.findAll({
      where: { id_user },
      include: [
        { model: PenyakitPadi, attributes: ['nama_penyakit', 'deskripsi', 'penanganan'] },
      ],
    });

    if (riwayatPrediksi.length === 0) {
      return res.status(404).json({ message: 'No history found for this user' });
    }

    // Kirim respons dengan riwayat prediksi
    res.status(200).json({
      riwayat_prediksi: riwayatPrediksi,
    });

  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

module.exports = router;
