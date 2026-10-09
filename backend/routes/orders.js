const router = require('express').Router();
const ordersController = require('../controllers/orders');

router.post('/', ordersController.postOrder);
router.get('/:id', ordersController.getOrder);
router.post('/:id/pay', ordersController.payOrder);

module.exports = router;
