const express = require('express');
const themeController = require('../controllers/themeController');

const router = express.Router();

router.route('/').get(themeController.getAll);
router.route('/:themeId').get(themeController.get);

module.exports = router;
