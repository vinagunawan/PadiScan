import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Container } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function HasilDiagnosis() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil data dari state yang dikirimkan
  const { prediction, deskripsi, penanganan, image } = location.state || {};

  const handleHistory = () => {
    navigate('/history');
  };

  const handleDiagnosisUlang = () => {
    navigate('/diagnosis');
  };

  return (
    <div className="bg-utama">
      <NavBarDashboard />
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

      <Container className="py-5">
        <Card variant="outlined">
          <CardContent>
            {prediction ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Prediksi Penyakit: {prediction}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Deskripsi:</strong> {deskripsi}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Penanganan:</strong> {penanganan}
                </Typography>

                {/* Menampilkan gambar jika ada */}
                {image && (
                  <div>
                    <Typography variant="h6">Gambar Hasil Diagnosis</Typography>
                    <img
                      src={image}
                      alt="Diagnosis"
                      style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
                    />
                  </div>
                )}
              </>
            ) : (
              <Typography variant="body1">Menunggu hasil diagnosis...</Typography>
            )}
          </CardContent>
        </Card>

        <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
          <Button
            onClick={handleDiagnosisUlang}
            variant="contained"
            color="primary"
            fullWidth
          >
            Diagnosis Ulang
          </Button>
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
