const express = require('express');
const router = express.Router();
const catchAsync = require('../middleware/catch-async');
const RizzService = require('../controllers/rizz-controller');
const service = new RizzService();

router.post(
  '/deuwifbeuwfbeuwbufbewifeww/',
  catchAsync(async (req, res) => {
    const { audio, image } = req.body;
    const result = await service.CreateRizz(audio, image);
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

router.get(
  '/top',
  catchAsync(async (req, res) => {
    const { page, limit } = req.query;
    const result = await service.GetTopRizz(page, limit);
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

router.get(
  '/latest',
  catchAsync(async (req, res) => {
    const { page, limit } = req.query;
    const result = await service.GetLatestRizz(page, limit);
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

router.post(
  '/:rizz_id/like',
  catchAsync(async (req, res) => {
    const { rizz_id } = req.params;
    const result = await service.LikeRizz(rizz_id);
    res.send({
      status: 'success',
      message: 'Successful',
      result: 1,
      data: result,
    });
  })
);

module.exports = router;
