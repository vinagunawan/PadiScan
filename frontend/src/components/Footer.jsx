import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-footer text-white py-4">
      <Container>
        <Row className="justify-content-between">
          {/* Informasi Kontak */}
          <Col md={4} className="mb-3">
            <h5>Kontak Kami</h5>
            <p>Email: info@padiscan.com</p>
            <p>Telp: +62 123 456 789</p>
          </Col>

          {/* Navigasi */}
          <Col md={4} className="mb-3">
            <h5>Navigasi</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">Tentang Kami</a></li>
              <li><a href="/layanan" className="text-white">Layanan</a></li>
              <li><a href="/login" className="text-white">Login</a></li>
            </ul>
          </Col>

          {/* Ikon Sosial Media */}
          <Col md={4} className="mb-3">
            <h5>Ikuti Kami</h5>
            <div>
              <a href="https://www.instagram.com" target="_blank" className="text-white me-3">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" className="text-white me-3">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com" target="_blank" className="text-white me-3">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://wa.me" target="_blank" className="text-white">
                <i className="fab fa-whatsapp fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; 2024 PadiScan. Semua Hak Cipta Dilindungi.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
