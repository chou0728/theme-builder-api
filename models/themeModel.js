const database = require('../database');

const themeModel = {
  getAll: (callback) => {
    database.query('SELECT * FROM themes', (err, results) => {
      if (err) return callback(err);
      callback(null, results); // 因為 callback 的第一個參數放 error，所以如果沒有錯誤第一個參數要傳 null
    });
  },
  get: (id) => {
    database.query(
      'SELECT * FROM themes WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  }
};

module.exports = themeModel;
