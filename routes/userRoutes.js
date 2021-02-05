const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(userController.login);
router.route('/info').get(authController.protect, userController.getInfo);
// To get new test token
router.route('/sign').get(userController.sign);

module.exports = router;
