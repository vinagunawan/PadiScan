const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 
const penyakitPadi = require('./penyakitPadi')

const RiwayatPrediksi = sequelize.define('RiwayatPrediksi', {
  id_prediksi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hasil_prediksi: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  penanganan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tanggal_prediksi: {
    type: DataTypes.DATE,  
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  },
}, {
  tableName: 'riwayat_prediksi', 
  timestamps: false, 
});

RiwayatPrediksi.belongsTo(User, { foreignKey: 'id_user' });
RiwayatPrediksi.belongsTo(penyakitPadi, { foreignKey: 'id_penyakit' });

module.exports = RiwayatPrediksi;
