const express = require('express');
const themeController = require('../controllers/themeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, themeController.getAll);
router.route('/:themeId').get(authController.protect, themeController.get);

module.exports = router;
