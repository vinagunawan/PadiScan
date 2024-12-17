import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import NavBarDashboard from './NavBarDashboard';

function History() {
  const [historyData, setHistoryData] = useState([]);  // State untuk menyimpan data riwayat
  const [loading, setLoading] = useState(true);         // State untuk menandakan apakah data sedang diambil
  const [error, setError] = useState(null);             // State untuk menangani error

  // Mengambil data riwayat diagnosis dari backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/history'); // Ganti dengan URL backend Anda
        const data = await response.json();
        setHistoryData(data.history);  // Menyimpan data ke state
      } catch (err) {
        setError('Gagal mengambil data');
      } finally {
        setLoading(false);  // Mengubah loading menjadi false setelah data berhasil diambil
      }
    };

    fetchHistory();
  }, []);  // Empty array berarti efek ini hanya dijalankan sekali saat komponen dimuat

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
        {loading ? (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 4 }}>
            Memuat riwayat...
          </Typography>
        ) : error ? (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 4 }}>
            {error}
          </Typography>
        ) : historyData.length > 0 ? (
          historyData.map((item) => (
            <Card
              key={item.id_prediksi}
              sx={{
                maxWidth: 500,
                width: '100%',
                marginBottom: 2,
                borderRadius: '8px',
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Tanggal: {new Date(item.tanggal_prediksi).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Diagnosis: {item.hasil_prediksi}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
                  Penanganan: {item.penanganan || 'Tidak Diketahui'}
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
