const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto increment untuk id_user
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  // Menyesuaikan nama kolom createdAt dan updatedAt dengan database
  createdAt: 'created_at',
  updatedAt: 'update_at',
  timestamps: true, // Enable timestamps
  tableName: 'users', // Sesuaikan dengan nama tabel di DB
});

module.exports = User;
