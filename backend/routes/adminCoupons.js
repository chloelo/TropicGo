const router = require('express').Router();
const adminCouponsController = require('../controllers/adminCoupons');
const isAuth = require('../middlewares/isAuth');

router.use(isAuth);

router.get('/', adminCouponsController.getCoupons);
router.post('/', adminCouponsController.postCoupon);
router.put('/:id', adminCouponsController.putCoupon);
router.delete('/:id', adminCouponsController.deleteCoupon);

module.exports = router;
