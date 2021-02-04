const themeModel = require('../models/themeModel');
const componentModel = require('../models/componentModel');
const templateModal = require('../models/templateModal');
const colorModal = require('../models/colorModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const deepClone = require('../utils/deepClone');

const themeController = {
  getAll: catchAsync(async (req, res, next) => {
    try {
      let themes = await themeModel.getAll();
      let templates = await templateModal.getAll();
      for (let theme of themes) {
        const { themeId } = theme;
        theme.templates = deepClone(templates);
        let { colorId } = await colorModal.getEnabledColor({ themeId });
        let colors = await colorModal.getColorsByThemeId({ themeId });
        for (let template of theme.templates) {
          const { templateId } = template;
          let { componentId } = await componentModel.getEnabledComponent({
            themeId,
            templateId
          });
          template.enabledComponent = componentId;
          template.enabledColor = colorId;
          template.colors = colors;
        }
      }
      res.status(200).json({
        status: 'success',
        data: themes
      });
    } catch (err) {
      console.log(err);
      next(new AppError(err, 500));
    }
  }),
  get: catchAsync(async (req, res, next) => {
    const themeId = parseInt(req.params.themeId);
    const payload = { themeId };
    try {
      const theme = await themeModel.get(payload);
      res.status(200).json({
        status: 'success',
        data: theme
      });
    } catch (err) {
      console.log(err);
      next(new AppError(err, 500));
    }
  })
};

module.exports = themeController;
