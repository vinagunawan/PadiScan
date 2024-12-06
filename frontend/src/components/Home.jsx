import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import NavBar from "./Navbar";

function Home() {
  const navigate = useNavigate(); 
  const handleMulaiIdentifikasi = () => {
    navigate('/diagnosis');
  };

  const handlePelajariLebihLanjut = () => {
    navigate('/tentangKami');
  };

  const articles = [
    { 
      id: 1, 
      title: "4 Tahap Menanam Padi yang Baik dan Menguntungkan, Mudah dan Praktis", 
      image: "/images/art1.png", 
      description: "Cara menanam padi yang baik dan menguntungkan tentunya sangat penting diterapkan. Apalagi, olahan dari padi atau nasi merupakan bahan makanan pokok untuk orang Indonesia. Menanam padi di iklim tropis seperti Indonesia juga dapat membuatnya tumbuh sumbur. ", 
      link: "https://putatgede.kendalkab.go.id/kabardetail/ejJBcDhzUWF2SDNGcm53bUY2QmsyQT09/4-tahap-menanam-padi-yang-baik-dan-menguntungkan--mudah-dan-praktis.html" 
    },
    { 
      id: 2, 
      title: "Mengenal 5 Hama Utama Pada Tanaman Padi", 
      image: "/images/art2.png", 
      description: "Dalam praktik budidaya padi, keberadaan hama menjadi salah satu masalah utama yang harus dihadapi. Serangan hama pada tanaman padi dapat mengakibatkan penurunan produktivitas yang signifikan jika tidak ditangani dengan tepat.", 
      link: "https://bbppbinuang.bppsdmp.pertanian.go.id/artikel/mengenal-5-hama-utama-pada-tanaman-padi" 
    },
    { 
      id: 3, 
      title: "Teknologi Pertanian: Kunci untuk Meningkatkan Produktivitas di Desa", 
      image: "/images/art3.png", 
      description: "Revolusi teknologi telah merambah ke berbagai sektor, termasuk pertanian. Di era digital ini, teknologi menawarkan solusi inovatif untuk meningkatkan produktivitas, efisiensi, dan kualitas hasil panen di sektor pertanian, terutama di daerah pedesaan.", 
      link: "https://gondoharum.kendalkab.go.id/kabardetail/OGtFamVXSUxUNlJ0WTFTRCtBc2VsUT09/teknologi-pertanian--kunci-untuk-meningkatkan-produktivitas-di-desa.html" 
    },
    { id: 4, 
      title: "Petani Padi Organik Kalisalak Manfaatkan Tanaman Padi Untuk Pupuk dan Herbisida", 
      image: "/images/art4.png", 
      description: "Hujan mulai mengguyur wilayah Kabupaten Magelang, sejumlah petani di Desa Kalisalak Kecamatan Salaman Kabupaten Magelang kembali bersemangat menggarap sawah. Mereka menanam padi organik varietas Srimulyo yang tersertifikasi.", 
      link: "https://ppid.magelangkab.go.id/berita/petani-padi-organik-kalisalak-manfaatkan-tanaman-padi-untuk-pupuk-dan-herbisida" 
    },
    { id: 5, 
      title: "Cara Pemupukan Padi yang Tepat untuk Optimalkan Hasil Panen", 
      image: "/images/art5.png", 
      description: "Cara pemupukan padi adalah salah satu kunci untuk mendapatkan hasil panen yang optimal dan tentunya melimpah. Jika salah dalam memberikan pupuk pada padi, bukannya panen melimpah yang akan didapat tapi justru risiko tanaman padi menjadi rusak.", 
      link: "https://dero.desa.id/artikel/2022/12/11/cara-pemupukan-padi-yang-tepat-untuk-optimalkan-hasil-panen-sumber-httpspekutankec-miritkebum" 
    },
    { id: 6, 
      title: "Penanganan Pasca Panen Padi", 
      image: "/images/art6.png", 
      description: "Pascapanen padi adalah serangkaian tahapan kegiatan yang meliputi pemungutan (pemanenan) malai, perontokan gabah, penampian, pengeringan, pengemasan, penyimpanan, dan pengolahan sampai siap dipasarkan atau dikonsumsi.", 
      link: "https://dinpertanpangan.demakkab.go.id/?p=9866" 
    },
  ];

  return (
    <div className="bg-utama">
      <NavBar />
      {/* Header Utama */}
      <header 
        className="text-white text-center py-5" 
        style={{
          backgroundImage: "url('/images/home-1.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">PadiScan</h1>
          <p className="lead fw-bold">Solusi Cerdas Identifikasi Penyakit Padi dengan AI</p>
        </div>
      </header>

      {/* Section 1: Gambaran Singkat */}
      <section className="container py-5">
      <h3 className="text-center text-success mb-2">Kenapa Memilih PadiScan?</h3>
      <p className="text-center mb-4">
        PadiScan mendukung pertanian cerdas dalam mengidentifikasi penyakit padi hingga memberikan solusi yang efektif sesuai dengan kebutuhan petani.
      </p>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100">
            <div className="d-flex align-items-start">
              <div className="icon-box me-3">
                <img src="/images/home-icon-1.png" alt="AI Icon" style={{ width: "40px", height: "40px" }} />
              </div>
              <div>
                <h6 className="fw-bold">Deteksi AI</h6>
                <p className="mb-0">
                  Identifikasi penyakit padi dengan akurasi tinggi menggunakan teknologi AI canggih.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100">
            <div className="d-flex align-items-start">
              <div className="icon-box me-3">
                <img src="/images/home-icon-2.png" alt="Speed Icon" style={{ width: "40px", height: "40px" }} />
              </div>
              <div>
                <h6 className="fw-bold">Kecepatan Hasil</h6>
                <p className="mb-0">
                  Dapatkan hasil analisis dalam hitungan detik untuk tindakan cepat dan tepat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow border-0 p-4 h-100">
            <div className="d-flex align-items-start">
              <div className="icon-box me-3">
                <img src="/images/home-icon-3.png" alt="Ease Icon" style={{ width: "40px", height: "40px" }} />
              </div>
              <div>
                <h6 className="fw-bold">Kemudahan Penggunaan</h6>
                <p className="mb-0">
                  Antarmuka sederhana yang memudahkan siapa saja untuk mengunggah dan menganalisis data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Highlight Teknologi */}
      <section class="bg-kedua">
      <div className="container py-5">
        <h3 className="text-center text-success mb-4">Teknologi di Balik PadiScan</h3>
        <div className="row">
          <div className="col-md-6">
            <h6 className="fw-bold">Kecerdasan Buatan</h6>
            <p>
              PadiScan menggunakan teknologi AI untuk menganalisis data dan mendeteksi penyakit padi dengan
              akurasi tinggi. Sistem ini terus belajar untuk memberikan hasil terbaik kepada pengguna.
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold">Inovasi dan Keandalan</h6>
            <p>
              Kami mengintegrasikan teknologi terkini dalam setiap proses sehingga memberikan solusi yang
              andal dan inovatif untuk meningkatkan hasil pertanian.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Artikel Penyakit Padi */}
      <section className="container py-5">
        <h3 className="text-center text-success mb-4">Artikel Tentang Padi</h3>
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-6 col-lg-4 mb-4" key={article.id}>
              <div className="card h-100 shadow-sm">
                {/* Membungkus card dengan tag <a> untuk navigasi */}
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <img src={article.image} className="card-img-top" alt={article.title} />
                  <div className="card-body">
                    <h6 className="card-title">{article.title}</h6>
                    <p className="card-text">{article.description}</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
