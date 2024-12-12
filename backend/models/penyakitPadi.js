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
    allowNull: true, 
  },
}, {
  tableName: 'penyakit_padi', 
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: 'updated_at', 
});

module.exports = PenyakitPadi;
