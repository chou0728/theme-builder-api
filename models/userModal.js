const { query } = require('../database');
const snakeToCamel = require('../utils/snakeToCamel');

const userModal = {
  findById: async (payload) => {
    const { userId } = payload;
    const sql = `SELECT * FROM users WHERE user_id=${userId}`;
    try {
      const results = await query(sql);
      return snakeToCamel(results[0]);
    } catch (err) {
      return err;
    }
  },
  getInfo: async () => {
    const sql = `SELECT * FROM users`;
    try {
      const results = await query(sql);
      return snakeToCamel(results[0]);
    } catch (err) {
      return err;
    }
  }
};

module.exports = userModal;
