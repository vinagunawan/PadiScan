import React from "react";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from "./NavBarDashboard";

function Dashboard() {
  const navigate = useNavigate();

  // Fungsi untuk menavigasi ke halaman Diagnosis
  const handleMulaiIdentifikasi = () => {
    navigate('/diagnosis');
  };

  // Fungsi untuk menavigasi ke Riwayat Diagnosis
  const handleRiwayatDiagnosis = () => {
    navigate('/history');
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
        <div className="container">
          <h1 className="display-4 fw-bold">Dashboard PadiScan</h1>
          <p className="lead fw-bold">Selamat datang di Dashboard Anda! Pilih opsi di bawah untuk mulai.</p>
        </div>
      </header>

      {/* Card Identifikasi Baru dan Riwayat Diagnosis */}
      <div className="container mt-4" style={{ minHeight: '70vh' }}>
        <div className="row">
          {/* Card Identifikasi Baru */}
          <div className="col-12 col-md-6 mb-4">
            <div className="card p-3">
              <h5>Identifikasi Baru</h5>
              <p>Mulai identifikasi untuk mendapatkan diagnosis terbaru.</p>
              <button className="btn btn-success" onClick={handleMulaiIdentifikasi}>Mulai Identifikasi</button>
            </div>
          </div>
          
          {/* Card Riwayat Diagnosis */}
          <div className="col-12 col-md-6 mb-4">
            <div className="card p-3">
              <h5>Riwayat Diagnosis</h5>
              <p>Lihat hasil diagnosis sebelumnya yang sudah dilakukan.</p>
              <button className="btn btn-secondary" onClick={handleRiwayatDiagnosis}>Lihat Riwayat</button>
            </div>
          </div>
        </div>

        <div className="container mt-4">
        <div className="row">
            {/* Statistik Ringkasan */}
            <div className="col-12 col-md-4 mb-4">
            <div className="card p-3">
                <h5>Total Diagnosis</h5>
                <p>Jumlah diagnosis yang berhasil dilakukan.</p>
                <h4>120</h4> {/* Data dinamis */}
            </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
            <div className="card p-3">
                <h5>Diagnosis Terkini</h5>
                <p>Jumlah diagnosis yang sedang berlangsung.</p>
                <h4>5</h4> {/* Data dinamis */}
            </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
            <div className="card p-3">
                <h5>Riwayat Diagnosis</h5>
                <p>Jumlah riwayat diagnosis yang tersimpan.</p>
                <h4>50</h4> {/* Data dinamis */}
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
