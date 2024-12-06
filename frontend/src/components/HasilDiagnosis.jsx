import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function HasilDiagnosis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {}; // Get image from state

  // Handle button click for History
  const handleHistory = () => {
    navigate('/history');
  };

  // Handle button click for Diagnosis Ulang
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
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Hasil Identifikasi</h1>
          <p className="lead fw-bold">
            Berikut adalah hasil diagnosis tanaman padi Anda.
          </p>
        </div>
      </header>

      {/* Diagnosis Result Section */}
      <section className="container py-5">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Card
            sx={{
              maxWidth: 600,
              width: '100%',
              padding: 3,
              borderRadius: '8px',
              boxShadow: 0, // No shadow to blend with background
              backgroundColor: 'transparent', // Transparent background
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

              {/* Diagnosis and Handling */}
              <Typography variant="h5" sx={{ marginTop: 2 }} className="text-center fw-bold text-success">
                Diagnosis: Tanaman padi Anda sehat
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }} className="text-center">
                Penanganan: Tidak diperlukan tindakan lebih lanjut.
              </Typography>

              {/* Navigation Buttons - Align horizontally */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 2,
                  gap: 3, // Space between buttons
                  width: '100%', // Ensure they take full width of the container
                }}
              >
                <button
                  className="btn btn-secondary w-100"
                  onClick={handleHistory}
                >
                  History
                </button>
                <button
                  className="btn btn-success w-100"
                  onClick={handleDiagnosisUlang}
                >
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
