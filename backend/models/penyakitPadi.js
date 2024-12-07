const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PenyakitPadi = sequelize.define('PenyakitPadi', {
  nama_penyakit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  penanganan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = PenyakitPadi;
