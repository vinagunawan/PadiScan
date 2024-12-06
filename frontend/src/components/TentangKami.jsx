import React from 'react';
import Footer from './Footer';
import '../App.css';
import NavBar from './Navbar';

function TentangKami() {
  return (
    <div className="bg-utama">
      <NavBar />
      {/* Header */}
      <header
        className="text-white text-center py-5"
        style={{
          backgroundImage: "url('/images/home-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="display-4 fw-bold">Tentang Kami</h1>
        <p className="lead">Kami menyediakan solusi terbaik untuk identifikasi penyakit padi menggunakan teknologi AI.</p>
      </header>

      {/* Section 1: Visi */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-success">Visi</h2>
          <p className="text-justify center-text">
            Menjadi solusi terdepan dalam membantu petani meningkatkan produktivitas
            dan keberlanjutan pertanian. Melalui teknologi kecerdasan buatan (AI) yang
            inovatif, kami berkomitmen untuk menghadirkan alat yang dapat membantu petani
            mengelola tanaman dengan lebih efektif. Selain itu, kami juga mendukung praktik
            pertanian yang berkelanjutan dengan menyediakan solusi yang terpercaya dan relevan
            untuk masa depan pertanian.
          </p>
        </div>
      </section>

      {/* Section 2: Misi */}
      <section className="py-5 bg-kedua">
        <div className="container">
          <h2 className="text-center mb-4 text-success">Misi</h2>
          <ul>
            <li>
              <p className="text-justify center-text">
                <strong>Menyediakan Teknologi AI yang Mudah Diakses:</strong> Mengembangkan platform
                yang memanfaatkan algoritma machine learning untuk mendiagnosis penyakit
                padi secara cepat, akurat, dan efisien.
              </p>
            </li>
            <li>
              <p className="text-justify center-text">
                <strong>Meningkatkan Produktivitas Petani:</strong> Memberikan hasil identifikasi
                penyakit padi yang dapat membantu petani mengambil tindakan yang tepat
                dalam pengelolaan tanaman.
              </p>
            </li>
            <li>
              <p className="text-justify center-text">
                <strong>Mendorong Keberlanjutan Pertanian:</strong> Mendukung praktik pertanian
                berkelanjutan dengan menyediakan panduan pengelolaan tanaman berdasarkan
                hasil analisis teknologi modern.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Latar Belakang */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-success">Latar Belakang</h2>
          <p className="center-text">
            PadiScan dikembangkan untuk menjawab tantangan besar yang dihadapi oleh 
            petani dalam mengidentifikasi penyakit yang menyerang tanaman padi. Dalam 
            dunia pertanian, deteksi dini terhadap penyakit sangat penting untuk mencegah 
            kerugian besar yang dapat mengganggu hasil panen. Dengan memanfaatkan teknologi 
            kecerdasan buatan (AI), PadiScan memberikan solusi yang mampu melakukan diagnosis 
            secara cepat dan akurat. Teknologi ini membantu petani untuk mengambil langkah-langkah 
            yang tepat dalam perawatan tanaman, sehingga tanaman tetap sehat dan produktivitasnya dapat 
            meningkat secara signifikan. Hal ini tentunya memberikan dampak positif dalam mengurangi kerugian 
            ekonomi yang sering kali dihadapi oleh petani akibat serangan penyakit.
          </p>
          <p className="center-text">
            PadiScan juga mengintegrasikan teknologi modern dalam bentuk platform digital yang memberikan 
            kemudahan akses kepada petani. Dengan solusi berbasis data ini, para petani dapat mengakses alat 
            bantu untuk mendeteksi penyakit kapan saja dan di mana saja, hanya melalui perangkat mobile atau 
            komputer mereka. Hal ini menghilangkan hambatan geografis dan waktu, memberikan kebebasan bagi petani 
            untuk terus memantau kesehatan tanaman mereka tanpa harus menunggu bantuan ahli. Teknologi ini juga 
            memungkinkan adanya pembaruan dan peningkatan fitur yang terus berkembang seiring berjalannya waktu, 
            sehingga petani selalu memiliki alat yang up-to-date untuk mengelola pertanian mereka dengan lebih efisien.
          </p>
        </div>
      </section>

      {/* Section 4: Teknologi Kami */}
      <section className="py-5 bg-kedua">
        <div className="container">
          <h2 className="text-center mb-4 text-success">Teknologi Kami</h2>
          <p className="center-text">
            PadiScan menggunakan algoritma <strong>Decision Tree</strong>, sebuah 
            metode machine learning yang efektif untuk klasifikasi gambar dengan cara 
            membagi data berdasarkan fitur-fitur yang relevan. Algoritma ini menganalisis 
            gambar daun padi dengan cepat dan akurat, memastikan bahwa setiap gambar yang 
            diunggah dapat diproses untuk menghasilkan diagnosa yang tepat dan dapat diandalkan.
          </p>
          <p className="center-text">
            Untuk ekstraksi fitur, PadiScan memanfaatkan metode <strong>Histogram of Oriented 
            Gradients (HOG)</strong>, yang berfokus pada deteksi pola dan perubahan intensitas dalam gambar. 
            HOG membagi gambar menjadi sel-sel kecil dan menganalisis perbedaan intensitas cahaya untuk menangkap 
            informasi struktural, sehingga memungkinkan sistem untuk mengenali ciri khas penyakit pada daun padi secara 
            lebih detail dan presisi.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default TentangKami;
