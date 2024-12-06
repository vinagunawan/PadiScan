import React, { useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import NavBarDashboard from './NavBarDashboard'; // Navbar yang digunakan sebelumnya

function Diagnosis() {
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Untuk membuka/menutup kamera
  const [image, setImage] = useState(null); // Menyimpan gambar yang dipilih/tangkap
  const webcamRef = React.useRef(null);
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangkap foto dari kamera
  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setImage(photo);
    setIsCameraOpen(false); // Menutup kamera setelah foto diambil
  };

  // Fungsi untuk menangani unggahan gambar dari file
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Mengambil file gambar yang dipilih
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Menampilkan gambar yang diunggah
    };
    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    }
  };

  // Fungsi untuk menavigasi ke halaman hasil diagnosis setelah foto diunggah
  const handleSubmit = () => {
    if (!image) {
      alert("Mohon unggah atau ambil foto terlebih dahulu!");
      return;
    }
    
    // Menavigasi ke halaman hasil diagnosis setelah foto diunggah
    navigate("/hasilDiagnosis", { state: { image } });
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Halaman Identofikasi</h1>
          <p className="lead fw-bold">
            Unggah atau ambil foto untuk mendapatkan identifikasi tanaman padi Anda.
          </p>
        </div>
      </header>

      {/* Section: Gambaran Singkat Diagnosis */}
      <section className="container py-5">
        <h3 className="text-center text-success mb-4">Cara Menggunakan PadiScan</h3>
        <p className="text-center mb-4">
          PadiScan mendukung pertanian cerdas dalam mengidentifikasi penyakit padi hingga memberikan solusi yang efektif sesuai dengan kebutuhan petani.
        </p>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <div className="d-flex align-items-start">
                <div className="icon-box me-3">
                  <img src="/images/home-icon-1.png" alt="AI Icon" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h6 className="fw-bold">Upload Gambar</h6>
                  <p className="mb-0">
                    Unggah gambar untuk memulai identifikasi penyakit padi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <div className="d-flex align-items-start">
                <div className="icon-box me-3">
                  <img src="/images/home-icon-2.png" alt="Speed Icon" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h6 className="fw-bold">Kirim Gambar</h6>
                  <p className="mb-0">
                    Kirim gambar untuk mendapatkan hasil identifikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <div className="d-flex align-items-start">
                <div className="icon-box me-3">
                  <img src="/images/home-icon-3.png" alt="Ease Icon" style={{ width: "40px", height: "40px" }} />
                </div>
                <div>
                  <h6 className="fw-bold">Hasil Identifikasi</h6>
                  <p className="mb-0">
                    Lihat hasil identifikasi penyakit pada tanaman padi Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulir Diagnosis */}
      <section className="container py-5">
        <div className="mb-4 text-center">
          {image ? (
            <img
              src={image}
              alt="Captured or Uploaded"
              className="img-fluid rounded mb-3"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : isCameraOpen ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{
                  facingMode: "environment",
                }}
                className="mb-3"
              />
              <button
                className="btn btn-success w-100 mb-3"
                onClick={capturePhoto}
              >
                Ambil Foto
              </button>
            </>
          ) : (
            <p className="text-center mb-3">Unggah atau tangkap foto untuk diagnosis</p>
          )}
        </div>

        {/* File Input & Submit Button */}
        <div className="d-flex justify-content-between mb-3 flex-column flex-md-row gap-3">
          {!isCameraOpen && !image && (
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => setIsCameraOpen(true)}
            >
              Buka Kamera
            </button>
          )}

          {!isCameraOpen && !image && (
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="form-control w-100 mb-3"
            />
          )}

          <button
            className="btn btn-success w-100 mb-3"
            onClick={handleSubmit}
          >
            Kirim Foto
          </button>
        </div>
      </section>
    </div>
  );
}

export default Diagnosis;
