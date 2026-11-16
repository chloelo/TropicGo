const router = require('express').Router();
const adminToursController = require('../controllers/adminTours');
const adminDeparturesController = require('../controllers/adminDepartures');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const validateBody = require('../middlewares/validateBody');
const { tourSchema } = require('../schemas/tour');
const { departureSchema } = require('../schemas/departure');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

router.get('/', adminToursController.getTours);
router.get('/:id', adminToursController.getTour);
router.post('/', forbidDemo, validateBody(tourSchema), adminToursController.postTour);
router.put('/:id', forbidDemo, validateBody(tourSchema), adminToursController.putTour);
router.delete('/:id', forbidDemo, adminToursController.deleteTour);
router.get('/:id/departures', adminDeparturesController.getDepartures);
router.post(
  '/:id/departures',
  forbidDemo,
  validateBody(departureSchema),
  adminDeparturesController.postDeparture,
);

module.exports = router;
