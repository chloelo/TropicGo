const router = require('express').Router();
const couponsController = require('../controllers/coupons');
const { publicWriteLimiter } = require('../middlewares/rateLimit');

router.post('/check', publicWriteLimiter, couponsController.checkCoupon);

module.exports = router;
