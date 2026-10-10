const router = require('express').Router();
const adminOrdersController = require('../controllers/adminOrders');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminOrdersController.getOrders);
router.patch('/:id/status', forbidDemo, adminOrdersController.updateStatus);

module.exports = router;
