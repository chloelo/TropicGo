const router = require('express').Router();
const adminToursController = require('../controllers/adminTours');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminToursController.getTours);
router.get('/:id', adminToursController.getTour);
router.post('/', forbidDemo, adminToursController.postTour);
router.put('/:id', forbidDemo, adminToursController.putTour);
router.delete('/:id', forbidDemo, adminToursController.deleteTour);

module.exports = router;
