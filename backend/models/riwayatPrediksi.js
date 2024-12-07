const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const RiwayatPrediksi = sequelize.define('RiwayatPrediksi', {
  image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasil_prediksi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  penanganan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

RiwayatPrediksi.belongsTo(User, { foreignKey: 'id_user' });

module.exports = RiwayatPrediksi;
