import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function History() {
  // Contoh data riwayat diagnosis, bisa diganti dengan data dari backend atau local storage
  const historyData = [
    {
      id: 1,
      date: '2024-12-01',
      diagnosis: 'Tanaman padi sehat',
      action: 'Tidak diperlukan tindakan',
    },
    {
      id: 2,
      date: '2024-11-28',
      diagnosis: 'Hawar daun bakteri',
      action: 'Semprotkan fungisida sesuai dosis',
    },
  ];

  return (
    <div className="bg-utama">
      <NavBarDashboard/>
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
          <h1 className="display-4 fw-bold">Riwayat Identifikasi</h1>
          <p className="lead fw-bold">Berikut adalah riwayat identifikasi tanaman padi Anda.</p>
        </div>
      </header>

      {/* Konten Riwayat */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        {historyData.length > 0 ? (
          historyData.map((item) => (
            <Card
              key={item.id}
              sx={{
                maxWidth: 500,
                width: '100%',
                marginBottom: 2,
                borderRadius: '8px',
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Tanggal: {item.date}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Diagnosis: {item.diagnosis}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
                  Penanganan: {item.action}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 4 }}>
            Belum ada riwayat diagnosis.
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default History;
