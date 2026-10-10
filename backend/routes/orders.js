const router = require('express').Router();
const ordersController = require('../controllers/orders');
const { publicWriteLimiter } = require('../middlewares/rateLimit');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.post('/', publicWriteLimiter, ordersController.postOrder);
router.get('/:id', ordersController.getOrder);
router.post('/:id/pay', publicWriteLimiter, ordersController.payOrder);

module.exports = router;
