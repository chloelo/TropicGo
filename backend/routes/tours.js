const router = require('express').Router();
const toursController = require('../controllers/tours');

router.get('/', toursController.getTours);
router.get('/:id', toursController.getTour);

module.exports = router;
