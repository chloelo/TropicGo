const router = require('express').Router();
const couponsController = require('../controllers/coupons');

router.post('/check', couponsController.checkCoupon);

module.exports = router;
