import React, { useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from './NavBarDashboard';
import axios from 'axios';

function Diagnosis() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState(null); // Menyimpan gambar dalam bentuk URL
  const [imageFile, setImageFile] = useState(null); // Menyimpan gambar sebagai file
  const [loading, setLoading] = useState(false); // Menyimpan status loading saat gambar dikirim
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

  // Fungsi untuk menangkap foto dari webcam
  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setImage(photo);  // Menyimpan hasil screenshot dalam state image
    setIsCameraOpen(false); // Menutup kamera setelah foto diambil

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
  };

  // Fungsi untuk menangani perubahan file (pilih file dari komputer)
  const handleFileChange = (event) => { // perbaikan
    const file = event.target.files[0]; // Mengambil file pertama yang dipilih
    if (file) {
      setImageFile(file);  // Menyimpan file dalam state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Menyimpan hasil pembacaan file dalam state image
      };
      reader.readAsDataURL(file); // Membaca file sebagai data URL
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
    formData.append("file", imageFile); // Mengirimkan file gambar ke backend
  
    try {
      // Kirim gambar ke backend Node.js untuk diteruskan ke Flask
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const prediction = response.data.prediction;
      alert("Prediction: " + prediction);
      setLoading(false);
      navigate("/HasilPrediksi");
    } catch (error) {
      setLoading(false);
      alert("Failed to upload image. Please try again.");
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

      <section className="container py-5">
        {image ? (
          <img src={image} alt="Captured or Uploaded" className="img-fluid rounded mb-3" style={{ maxWidth: "100%", height: "auto" }} />
        ) : isCameraOpen ? (
          <>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width="100%" videoConstraints={{ facingMode: "environment" }} className="mb-3" />
            <button className="btn btn-success w-100 mb-3" onClick={capturePhoto}>Ambil Foto</button>
          </>
        ) : (
          <p className="text-center mb-3">Unggah atau tangkap foto untuk diagnosis</p>
        )}

        <div className="d-flex justify-content-between mb-3 flex-column flex-md-row gap-3">
          {!isCameraOpen && !image && (
            <>
              <button className="btn btn-primary w-100 mb-3" onClick={() => setIsCameraOpen(true)}>Buka Kamera</button>
              <input type="file" onChange={handleFileChange} accept="image/*" className="form-control w-100 mb-3" />
            </>
          )}
          <button className="btn btn-success w-100 mb-3" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Foto'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Diagnosis;