const { query } = require('../database');
const snakeToCamel = require('../utils/snakeToCamel');

const templateModal = {
  getAll: async () => {
    const sql = `SELECT * FROM templates`;
    try {
      const results = await query(sql);
      return snakeToCamel(results);
    } catch (err) {
      return err;
    }
  }
};

module.exports = templateModal;
