router.post('/predict', async (req, res) => {
    const { session_id, id_user, file_path, features } = req.body;
  
    try {
      // Kirim data ke Flask API
      const flaskResponse = await axios.post('http://localhost:5000/predict', { features });
      const prediction = flaskResponse.data.prediction;
  
      // Simpan hasil prediksi ke database
      db.query(
        'INSERT INTO riwayat_prediksi (id_user, session_id, nama_file, hasil_prediksi) VALUES (?, ?, ?, ?)',
        [id_user, session_id, file_path, prediction],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Prediction saved', prediction });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  