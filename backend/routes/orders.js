const router = require('express').Router();
const ordersController = require('../controllers/orders');

router.post('/', ordersController.postOrder);
router.get('/:id', ordersController.getOrder);

module.exports = router;
