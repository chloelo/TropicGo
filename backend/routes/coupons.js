const router = require('express').Router();
const couponsController = require('../controllers/coupons');
const validateBody = require('../middlewares/validateBody');
const { couponCheckSchema } = require('../schemas/coupon');
const { publicWriteLimiter } = require('../middlewares/rateLimit');

router.post(
  '/check',
  publicWriteLimiter,
  validateBody(couponCheckSchema),
  couponsController.checkCoupon,
);

module.exports = router;
