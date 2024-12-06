import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const NavBarDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Contoh status login
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLogout = () => {
    // Proses logout, misalnya menghapus token atau sesi
    setIsLoggedIn(false);
    alert("Anda telah logout");

    // Setelah logout, arahkan ke halaman Home
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-utama">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img 
            src="/images/logo1.png"
            alt="logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Menu Navbar */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Link Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            
            {/* Profile Dropdown */}
            {isLoggedIn && (
              <li className="nav-item">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-profile">
                    {/* Ikon profil sebagai gambar PNG */}
                    <img src="/images/profile-icon.png" alt="Profile" style={{ width: '30px', height: '30px' }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarDashboard;
