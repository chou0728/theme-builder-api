const { query } = require('../database');
const snakeToCamel = require('../utils/snakeToCamel');

const themeModel = {
  getAll: async () => {
    const sql = `SELECT * FROM themes`;
    try {
      const results = await query(sql);
      return snakeToCamel(results);
    } catch (err) {
      return err;
    }
  },
  get: async (payload) => {
    const { themeId } = payload;
    const sql = `SELECT * FROM themes WHERE theme_id=${themeId}`;
    try {
      const results = await query(sql);
      return snakeToCamel(results[0]);
    } catch (err) {
      return err;
    }
  }
};

module.exports = themeModel;
