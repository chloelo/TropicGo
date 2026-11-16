const router = require('express').Router();
const adminCouponsController = require('../controllers/adminCoupons');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const validateBody = require('../middlewares/validateBody');
const { couponSchema } = require('../schemas/coupon');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminCouponsController.getCoupons);
router.post('/', forbidDemo, validateBody(couponSchema), adminCouponsController.postCoupon);
router.put('/:id', forbidDemo, validateBody(couponSchema), adminCouponsController.putCoupon);
router.delete('/:id', forbidDemo, adminCouponsController.deleteCoupon);

module.exports = router;
