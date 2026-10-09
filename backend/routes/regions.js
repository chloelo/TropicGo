const router = require('express').Router();
const regionsController = require('../controllers/regions');

router.get('/', regionsController.getRegions);

module.exports = router;
