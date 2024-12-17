import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function HasilDiagnosis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, deskripsi, penanganan } = location.state || {}; // Mengambil data yang dikirim melalui state

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
        }}
      >
        <Typography variant="h4">Hasil Diagnosis</Typography>
      </header>
      <Box className="container py-5">
        <Card>
          <CardContent>
            {prediction ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Prediksi Penyakit: {prediction}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Deskripsi:</strong> {deskripsi}
                </Typography>
                <Typography variant="body1">
                  <strong>Penanganan:</strong> {penanganan}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">Menunggu hasil diagnosis...</Typography>
            )}
          </CardContent>
        </Card>
        <Box mt={3}>
          <button onClick={handleDiagnosisUlang} className="btn btn-primary">
            Diagnosis Ulang
          </button>
          <button onClick={handleHistory} className="btn btn-secondary">
            Lihat Riwayat Diagnosis
          </button>
        </Box>
      </Box>
    </div>
  );
}

export default HasilDiagnosis;
