import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';  // Untuk memantau lokasi aktif

const NavBarDashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Menyimpan status navbar terbuka
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Status login, bisa diubah sesuai kebutuhan
  const navigate = useNavigate();
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

  // Fungsi untuk logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Set status login menjadi false
    alert("Anda telah logout");
    navigate('/'); // Arahkan ke halaman Home setelah logout
  };

  return (
    <Navbar 
      className="navbar-fixed-top bg-utama" 
      expand="lg" 
      style={{ width: '100%', zIndex: '1000' }} 
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img 
            src="/images/logo1.png"
            alt="logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>

        {/* Navbar Toggle untuk mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsNavOpen(!isNavOpen)} />
        
        {/* Navbar Collapse untuk link */}
        <Navbar.Collapse id="navbar-nav" in={isNavOpen}>
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* Dashboard Link */}
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            
            {/* Profile Dropdown */}
            {isLoggedIn && (
              <Nav.Item>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-profile">
                    {/* Gambar Profil */}
                    <img src="/images/profile-icon.png" alt="Profile" style={{ width: '30px', height: '30px' }} />
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarDashboard;
