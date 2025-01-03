import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from './NavBarDashboard';
import axios from 'axios';

function Diagnosis() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Menyimpan gambar sebagai file
  const [loading, setLoading] = useState(false); // Menyimpan status loading saat gambar dikirim
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // Fungsi untuk menangkap foto dari webcam
  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    if (photo) {
      setImageFile(photo);  // Menyimpan hasil screenshot dalam state imageFile
      setIsCameraOpen(false); // Menutup kamera setelah foto diambil

      // Simpan foto ke localStorage
      localStorage.setItem("userImage", photo);

      // Mengonversi data URL menjadi file
      const byteString = atob(photo.split(',')[1]);
      const mimeString = photo.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const file = new Blob([uintArray], { type: mimeString });
      setImageFile(file); // Menyimpan file dalam state imageFile
    } else {
      alert("Gagal mengambil foto. Coba lagi.");
    }
  };

  // Fungsi untuk menangani perubahan file (pilih file dari komputer)
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Mengambil file pertama yang dipilih
    if (file && file.type.startsWith('image/')&& file.size <= 5 * 1024 * 1024) {
      setImageFile(file);  // Menyimpan file dalam state
      // Simpan gambar ke localStorage
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Fungsi untuk mengirim foto ke server Node.js
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!imageFile) {
      alert("Please capture or choose an image before submitting.");
      return;
    }
    
    setLoading(true); // Set status loading saat gambar sedang dikirim
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('id_user', localStorage.getItem('id_user')); 

    try {
      // Kirim gambar ke backend Node.js untuk diteruskan ke Flask
      const response = await axios.post("http://192.168.1.100/api/prediction/upload", formData);
      
      const prediction = response.data.prediction;
      alert("Prediction: " + prediction);
      setLoading(false);

      // Navigasi ke halaman hasil diagnosis
      navigate("/HasilDiagnosis", {
        state: {
          prediction: response.data.prediction,  // Menyertakan data prediksi
          deskripsi: response.data.deskripsi,    // Data deskripsi penyakit
          penanganan: response.data.penanganan,   // Data penanganan penyakit
          image: URL.createObjectURL(imageFile)
        }
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Kesalahan yang terjadi dari server
        alert("Server Error: " + error.response.data.message);
      } else if (error.request) {
        // Kesalahan yang terjadi pada request
        alert("Network Error: Please check your connection.");
      } else {
        // Kesalahan lainnya
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="bg-utama">
      <NavBarDashboard />
      <header className="text-white text-center py-5" style={{ backgroundImage: "url('/images/home-1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Halaman Identifikasi</h1>
          <p className="lead fw-bold">Unggah atau ambil foto untuk mendapatkan identifikasi tanaman padi Anda.</p>
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

      <section className="container py-5">
        {isCameraOpen ? (
          <>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width="100%" videoConstraints={{ facingMode: "environment" }} className="mb-3" />
            <button className="btn btn-success w-100 mb-3" onClick={capturePhoto}>Ambil Foto</button>
          </>
        ) : (
          <p className="text-center mb-3">Unggah atau tangkap foto untuk diagnosis</p>
        )}

        {/* Tampilkan gambar yang sudah diambil atau diunggah */}
        {imageFile && (
          <div className="text-center mb-3">
            <img src={URL.createObjectURL(imageFile)} alt="Captured" className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}

        <div className="d-flex justify-content-between mb-3 flex-column flex-md-row gap-3">
          {!isCameraOpen && !imageFile && (
            <>
              <button className="btn btn-success w-100 mb-3" onClick={() => setIsCameraOpen(true)}>Buka Kamera</button>
              <input type="file" onChange={handleFileChange} accept="image/*" className="form-control w-100 mb-3" />
            </>
          )}
          <button className="btn btn-success w-100 mb-3" onClick={handleSubmit} disabled={loading || !imageFile}>
            {loading ? 'Mengirim...' : 'Kirim Foto'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Diagnosis;
