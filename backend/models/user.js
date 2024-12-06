const db = require('../db/connection');
const bcrypt = require('bcrypt');

const User = {
  register: async (nama, email, password, callback) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO pengguna (nama, email, password) VALUES (?, ?, ?)';
    db.query(query, [nama, email, hashedPassword], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  login: (email, password, callback) => {
    const query = 'SELECT * FROM pengguna WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        callback(err, null);
      } else if (results.length === 0) {
        callback(null, { success: false, message: 'Email not found' });
      } else {
        const isPasswordMatch = await bcrypt.compare(password, results[0].password);
        if (isPasswordMatch) {
          callback(null, { success: true, user: results[0] });
        } else {
          callback(null, { success: false, message: 'Invalid password' });
        }
      }
    });
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM pengguna WHERE id_user = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },
};

module.exports = User;
