import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Container } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function HasilDiagnosis() {
  const location = useLocation(); // Untuk mendapatkan data dari halaman sebelumnya
  const navigate = useNavigate(); // Untuk navigasi antar halaman

  // Mengambil data dari state yang dikirimkan melalui navigasi
  const { 
    prediction = "Tidak ada data prediksi", // Prediksi hasil diagnosis
    deskripsi = "Deskripsi tidak tersedia", // Deskripsi penyakit
    penanganan = "Penanganan tidak tersedia", // Penanganan penyakit
    image // URL gambar yang diunggah pengguna
  } = location.state || {};

  // Navigasi ke halaman riwayat diagnosis
  const handleHistory = () => {
    navigate('/history');
  };

  // Navigasi ke halaman diagnosis ulang
  const handleDiagnosisUlang = () => {
    navigate('/diagnosis');
  };

  return (
    <div className="bg-utama">
      {/* Navbar */}
      <NavBarDashboard />

      {/* Header */}
      <header
        className="text-white text-center py-5"
        style={{
          backgroundImage: "url('/images/home-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Typography variant="h4" component="h1">Hasil Diagnosis</Typography>
      </header>

      {/* Kontainer Utama */}
      <Container className="py-5">
        <Card variant="outlined">
          <CardContent>
            {prediction ? (
              <>
                {/* Menampilkan prediksi penyakit */}
                <Typography variant="h5" gutterBottom>
                  Prediksi Penyakit: {prediction}
                </Typography>

                {/* Menampilkan deskripsi penyakit */}
                <Typography variant="body1" paragraph>
                  <strong>Deskripsi:</strong> {deskripsi}
                </Typography>

                {/* Menampilkan penanganan penyakit */}
                <Typography variant="body1" paragraph>
                  <strong>Penanganan:</strong> {penanganan}
                </Typography>

                {/* Menampilkan gambar jika tersedia */}
                {image && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Gambar Hasil Diagnosis
                    </Typography>
                    <img
                      src={image}
                      alt="Diagnosis"
                      style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </>
            ) : (
              // Teks jika tidak ada hasil diagnosis
              <Typography variant="body1">Menunggu hasil diagnosis...</Typography>
            )}
          </CardContent>
        </Card>

        {/* Tombol Navigasi */}
        <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
          {/* Tombol untuk diagnosis ulang */}
          <Button
            onClick={handleDiagnosisUlang}
            variant="contained"
            color="primary"
            fullWidth
          >
            Diagnosis Ulang
          </Button>

          {/* Tombol untuk melihat riwayat diagnosis */}
          <Button
            onClick={handleHistory}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Lihat Riwayat Diagnosis
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default HasilDiagnosis;
