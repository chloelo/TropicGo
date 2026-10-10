const router = require('express').Router();
const toursController = require('../controllers/tours');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.get('/', toursController.getTours);
router.get('/:id', toursController.getTour);

module.exports = router;
