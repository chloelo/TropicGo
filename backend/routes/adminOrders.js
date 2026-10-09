const router = require('express').Router();
const adminOrdersController = require('../controllers/adminOrders');
const isAuth = require('../middlewares/isAuth');

router.use(isAuth);

router.get('/', adminOrdersController.getOrders);
router.patch('/:id/status', adminOrdersController.updateStatus);

module.exports = router;
