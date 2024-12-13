import React, { useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from './NavBarDashboard';

function Diagnosis() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Menyimpan gambar sebagai file
  const [loading, setLoading] = useState(false);
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setImage(photo);
    setIsCameraOpen(false); // Menutup kamera setelah foto diambil

    // Mengonversi gambar data URL ke file
    const byteString = atob(photo.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([view], { type: 'image/jpeg' });
    const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
    setImageFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Menampilkan gambar yang diunggah
    };
    if (file) {
      setImageFile(file); // Menyimpan file gambar
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Mohon unggah atau ambil foto terlebih dahulu!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile); // Mengirim file gambar

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.prediction) {
        navigate("/hasilDiagnosis", { state: { image, prediction: data.prediction } });
      } else {
        alert('Terjadi kesalahan dalam diagnosis');
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Terjadi kesalahan, coba lagi!");
    } finally {
      setLoading(false);
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
