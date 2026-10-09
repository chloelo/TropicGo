const router = require('express').Router();
const adminToursController = require('../controllers/adminTours');
const isAuth = require('../middlewares/isAuth');

router.use(isAuth);

router.get('/', adminToursController.getTours);
router.get('/:id', adminToursController.getTour);
router.post('/', adminToursController.postTour);
router.put('/:id', adminToursController.putTour);
router.delete('/:id', adminToursController.deleteTour);

module.exports = router;
