import React from 'react';
import Footer from './Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import NavBar from './Navbar';

function Layanan() {
  return (
    <div className="bg-utama">
      <NavBar />
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
        <h1 className="display-4 fw-bold">Layanan Kami</h1>
        <p className="lead">Kami menyediakan solusi terbaik untuk identifikasi penyakit padi menggunakan teknologi AI.</p>
      </header>

      {/* Section 1: Fitur Utama */}
      <section className="py-5">
        <Container>
          <h2 className="text-center text-success mb-4">Fitur Utama</h2>
          <Row>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="feature-box">
                <i className="fas fa-camera fa-3x text-success mb-3"></i>
                <h4>Identifikasi Penyakit Padi dengan AI</h4>
                <p>
                  Menggunakan algoritma AI, kami menganalisis gambar daun padi untuk mendeteksi penyakit seperti blast, blight, dan tungro.
                </p>
              </div>
            </Col>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="feature-box">
                <i className="fas fa-book fa-3x text-success mb-3"></i>
                <h4>Rekomendasi Penanganan</h4>
                <p>
                  Kami menyediakan rekomendasi penanganan tanaman padi yang berbasis pada hasil analisis penyakit, untuk meningkatkan hasil panen.
                </p>
              </div>
            </Col>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="feature-box">
                <i className="fas fa-history fa-3x text-success mb-3"></i>
                <h4>Riwayat Hasil Identifikasi</h4>
                <p>
                  Hasil identifikasi dapat diakses kapan saja, memudahkan petani untuk memantau kesehatan tanaman mereka.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 2: Proses Identifikasi */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center text-success mb-4">Proses Identifikasi</h2>
          <Row>
            <Col md={6}>
              <h4 className="text-center">1. Unggah Foto Daun Padi</h4>
              <p className="text-center">
                Cukup unggah foto daun padi yang ingin Anda analisis. Sistem kami akan memproses gambar tersebut dengan cepat dan akurat.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="text-center">2. Proses dan Diagnosis</h4>
              <p className="text-center">
                Setelah gambar diunggah, sistem kami akan segera memprosesnya menggunakan algoritma machine learning dan memberikan hasil diagnosis dalam hitungan detik.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 3: Penyakit yang Dapat Diidentifikasi */}
      <section className="py-5">
        <Container>
          <h2 className="text-center text-success mb-4">Penyakit yang Dapat Diidentifikasi</h2>
          <Row>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="disease-box">
                <i className="fas fa-leaf fa-3x text-danger mb-3"></i>
                <h4>Blast</h4>
                <p>
                  Penyakit blast disebabkan oleh jamur <i>Pyricularia oryzae</i>, yang dapat mengurangi hasil panen secara signifikan.
                </p>
              </div>
            </Col>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="disease-box">
                <i className="fas fa-leaf fa-3x text-danger mb-3"></i>
                <h4>Blight</h4>
                <p>
                  Blight adalah penyakit yang disebabkan oleh infeksi bakteri atau jamur, yang merusak daun padi dan mengurangi hasil panen.
                </p>
              </div>
            </Col>
            <Col sm={12} md={4} className="text-center mb-4">
              <div className="disease-box">
                <i className="fas fa-leaf fa-3x text-danger mb-3"></i>
                <h4>Tungro</h4>
                <p>
                  Penyakit tungro disebabkan oleh virus yang dapat menyerang tanaman padi dan menurunkan kualitas serta kuantitas hasil panen.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    <Footer />
    </div>
  );
}

export default Layanan;
