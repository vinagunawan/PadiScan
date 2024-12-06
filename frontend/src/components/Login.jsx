import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    // Simulasi login berhasil
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard"); // Ganti dengan halaman tujuan setelah login
  };

  return (
    <div class="bg-utama">
    <Container fluid className="login-container">
      <Row className="w-100 m-0 h-100">
        {/* Kolom Form */}
        <Col xs={12} md={12} className="login-right">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Selamat Datang di PadiScan!</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Masuk
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <small>
                Belum punya akun?{" "}
                <Button variant="link" onClick={() => navigate("/register")}>
                  Daftar di sini
                </Button>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Login;
