const router = require('express').Router();
const adminCouponsController = require('../controllers/adminCoupons');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminCouponsController.getCoupons);
router.post('/', forbidDemo, adminCouponsController.postCoupon);
router.put('/:id', forbidDemo, adminCouponsController.putCoupon);
router.delete('/:id', forbidDemo, adminCouponsController.deleteCoupon);

module.exports = router;
