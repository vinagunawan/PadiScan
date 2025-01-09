import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Semua kolom harus diisi");
      return;
    }

    try {
      // Kirimkan data ke backend untuk registrasi
      const response = await axios.post("http://192.168.10.24:5000/api/auth/register", {
        username: name,
        email,
        password,
      });

      // Jika registrasi berhasil, navigasi ke halaman login
      if (response.status === 201) {
        navigate("/login");  // Arahkan ke halaman login setelah registrasi berhasil
      }
    } catch (err) {
      // Tangani jika ada error
      if (err.response) {
        setError(err.response.data.message);  // Menampilkan error dari backend
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="w-100 m-0 h-100">
        {/* Kolom Form */}
        <Col xs={12} md={12} className="login-right">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Daftar untuk PadiScan</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

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
                Daftar
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <small>
                Sudah punya akun?{" "}
                <Button variant="link" onClick={() => navigate("/login")}>
                  Masuk di sini
                </Button>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
