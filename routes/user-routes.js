const express = require('express');
const router = express.Router();
const catchAsync = require('../middleware/catch-async');
const UserService = require('../controllers/user-controller');
const service = new UserService();

router.post(
  '/',
  catchAsync(async (req, res) => {
    const { username, email } = req.body;
    const result = await service.CreateUser(username, email);
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

router.get(
  '/count',
  catchAsync(async (req, res) => {
    const result = await service.GetUsersCount();
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

module.exports = router;
