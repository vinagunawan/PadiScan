const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_user: { // Sesuaikan dengan kolom primary key
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Agar auto increment
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Enable timestamps (createdAt, updatedAt)
  tableName: 'users', // Sesuaikan dengan nama tabel yang ada di DB
});

module.exports = User;
