import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Tambahkan navigate
import NavBarDashboard from './NavBarDashboard';

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Gunakan navigate untuk mengarahkan pengguna

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const id_user = localStorage.getItem('id_user'); // Ambil id_user dari localStorage
        if (!id_user) {
          throw new Error('ID User tidak ditemukan. Silakan login kembali.');
        }

        const response = await fetch(`http://192.168.1.100/api/history/${id_user}`); // Masukkan id_user ke URL
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data = await response.json();
        setHistoryData(data.riwayat_prediksi);
      } catch (err) {
        setError(err.message);
        navigate('/login'); // Arahkan ke login jika gagal
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

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
          <h1 className="display-4 fw-bold">Riwayat Identifikasi</h1>
          <p className="lead fw-bold">Berikut adalah riwayat identifikasi tanaman padi Anda.</p>
        </div>
      </header>

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
