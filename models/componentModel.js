const { query } = require('../database');
const snakeToCamel = require('../utils/snakeToCamel');

const componentModel = {
  getAll: async (payload) => {
    const { themeId, templateId } = payload;
    const sql = `
        SELECT *
        FROM components
        WHERE theme_id=${themeId} AND template_id=${templateId}
        `;
    try {
      const results = await query(sql);
      return snakeToCamel(results);
    } catch (err) {
      return err;
    }
  },
  getEnabledComponent: async (payload) => {
    const { themeId, templateId } = payload;
    const sql = `
        SELECT component_id
        FROM components
        WHERE theme_id=${themeId} AND template_id=${templateId} AND status=1
        `;
    try {
      const results = await query(sql);
      return snakeToCamel(results[0]);
    } catch (err) {
      return err;
    }
  }
};

module.exports = componentModel;
