import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; 

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false); 
  const location = useLocation(); 
  const [prevScrollPos, setPrevScrollPos] = useState(0); 
  const [visible, setVisible] = useState(true); 
  
  // Efek untuk menutup navbar saat berpindah halaman
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  // Fungsi untuk menangani scroll
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset; 
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  // Hook untuk mendeteksi scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll); 
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [prevScrollPos]);

  return (
    <Navbar className="navbar-fixed-top bg-utama" expand="lg" style={{ width: '100%', zIndex: '1000' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
              src="/images/logo1.png"
              alt="logo"
              style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsNavOpen(!isNavOpen)} />
        <Navbar.Collapse id="navbar-nav" in={isNavOpen}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tentangKami">Tentang Kami</Nav.Link>
            <Nav.Link as={Link} to="/layanan">Layanan</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button as={Link} to="/login" variant="success" className="ms-3">Login</Button>
      </Container>
    </Navbar>
  );
}

export default NavBar;
