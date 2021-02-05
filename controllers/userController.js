const jwt = require('jsonwebtoken');
const userModal = require('../models/userModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const userController = {
  sign: catchAsync(async (req, res, next) => {
    try {
      const userId = 1;
      const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
      console.log(token);
      res.status(200).json({
        status: 'success',
        data: token
      });
    } catch (err) {
      console.log(err);
      next(new AppError(err, 500));
    }
  }),
  login: catchAsync(async (req, res, next) => {
    const decoded = await jwt.verify(
      req.body.token,
      process.env.JWT_SECRET_KEY
    );

    const currentUser = await userModal.findById({ userId: decoded.userId });
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    const accessToken = await jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({
      status: 'success',
      data: { accessToken }
    });
  }),
  getInfo: catchAsync(async (req, res, next) => {
    try {
      const userInfo = await userModal.getInfo();
      const { language, sitename, role } = userInfo;
      res.status(200).json({
        status: 'success',
        data: { language, sitename, role }
      });
    } catch (err) {
      console.log(err);
      next(new AppError(err, 500));
    }
  })
};

module.exports = userController;
