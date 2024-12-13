import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function HasilDiagnosis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, prediction, deskripsi, penanganan } = location.state || {}; // Mengambil data termasuk deskripsi dan penanganan

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
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Hasil Identifikasi</h1>
          <p className="lead fw-bold">Berikut adalah hasil diagnosis tanaman padi Anda.</p>
        </div>
      </header>

      <section className="container py-5">
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
          <Card
            sx={{
              maxWidth: 600,
              width: '100%',
              padding: 3,
              borderRadius: '8px',
              boxShadow: 0,
              backgroundColor: 'transparent',
            }}
          >
            <CardContent>
              {image ? (
                <img
                  src={image}
                  alt="Diagnosis Result"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
              ) : (
                <Typography variant="body2" className="text-center">
                  Gambar tidak ditemukan.
                </Typography>
              )}

              <Typography variant="h5" sx={{ marginTop: 2 }} className="text-center fw-bold text-success">
                Diagnosis: {prediction ? prediction : 'Tidak dapat diidentifikasi'}
              </Typography>

              {/* Menambahkan deskripsi dan penanganan penyakit */}
              {deskripsi && (
                <Typography variant="h6" sx={{ marginTop: 2 }} className="text-center">
                  <strong>Deskripsi Penyakit:</strong> {deskripsi}
                </Typography>
              )}
              {penanganan && (
                <Typography variant="h6" sx={{ marginTop: 2 }} className="text-center">
                  <strong>Penanganan:</strong> {penanganan}
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, gap: 3, width: '100%' }}>
                <button className="btn btn-secondary w-100" onClick={handleHistory}>
                  History
                </button>
                <button className="btn btn-success w-100" onClick={handleDiagnosisUlang}>
                  Diagnosis Ulang
                </button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </section>
    </div>
  );
}

export default HasilDiagnosis;
