const { query } = require('../database');
const snakeToCamel = require('../utils/snakeToCamel');

const colorModal = {
  getColorsByThemeId: async (payload) => {
    const { themeId } = payload;
    const sql = `
    SELECT *
    FROM colors
    WHERE theme_id=${themeId}
    `;
    try {
      const results = await query(sql);
      return snakeToCamel(results);
    } catch (err) {
      return err;
    }
  },
  getEnabledColor: async (payload) => {
    const { themeId } = payload;
    const sql = `
    SELECT color_id
    FROM colors
    WHERE theme_id=${themeId} AND color_status=1
    `;
    try {
      const results = await query(sql);
      return snakeToCamel(results[0]);
    } catch (err) {
      return err;
    }
  }
};
module.exports = colorModal;
