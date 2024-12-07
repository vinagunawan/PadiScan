const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const RiwayatPrediksi = sequelize.define('RiwayatPrediksi', {
  id_prediksi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasil_prediksi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'riwayat_prediksi',
});

RiwayatPrediksi.belongsTo(User, { foreignKey: 'id_user' });

module.exports = RiwayatPrediksi;
