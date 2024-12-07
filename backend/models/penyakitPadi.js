const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PenyakitPadi = sequelize.define('PenyakitPadi', {
  id_penyakit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_penyakit: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true, // Menyebabkan deskripsi boleh kosong
  },
  penanganan: {
    type: DataTypes.TEXT,
    allowNull: true, // Menyebabkan penanganan boleh kosong
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW, // Mengatur default ke waktu sekarang
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    onUpdate: DataTypes.NOW, // Menyediakan pembaruan otomatis
  }
}, {
  tableName: 'penyakit_padi', // Menyesuaikan dengan nama tabel di DB
  timestamps: false, // Tidak menggunakan timestamps otomatis oleh Sequelize
});

module.exports = PenyakitPadi;
