const themeModel = require('../models/themeModel');

const themeController = {
  getAll: (req, res) => {
    themeModel.getAll((err, results) => {
      if (err) return console.log(err);
      res.status(200).json({
        status: 'success',
        data: results
      });
    });
  },
  get: (req, res) => {
    const id = req.params.id;
    themeModel.get(id, (err, results) => {
      if (err) return console.log(err);
      res.status(200).json({
        status: 'success',
        data: results[0] // 因為就算只有一個結果 results 一樣會是一個陣列，所以要用 [0] 來取值
      });
    });
  }
};

module.exports = themeController;
