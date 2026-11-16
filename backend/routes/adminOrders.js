const router = require('express').Router();
const adminOrdersController = require('../controllers/adminOrders');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const validateBody = require('../middlewares/validateBody');
const { orderStatusSchema } = require('../schemas/order');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminOrdersController.getOrders);
router.patch(
  '/:id/status',
  forbidDemo,
  validateBody(orderStatusSchema),
  adminOrdersController.updateStatus,
);

module.exports = router;
