const router = require('express').Router();
const adminToursController = require('../controllers/adminTours');
const isAuth = require('../middlewares/isAuth');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminToursController.getTours);
router.get('/:id', adminToursController.getTour);
router.post('/', adminToursController.postTour);
router.put('/:id', adminToursController.putTour);
router.delete('/:id', adminToursController.deleteTour);

module.exports = router;
