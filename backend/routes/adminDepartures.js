const router = require('express').Router();
const adminDeparturesController = require('../controllers/adminDepartures');
const isAuth = require('../middlewares/isAuth');
const forbidDemo = require('../middlewares/forbidDemo');
const checkUuidParam = require('../middlewares/checkUuidParam');

router.param('id', checkUuidParam);

router.use(isAuth);

// 查詢、新增掛在 /api/admin/tours/:id/departures（屬於某個行程），這裡只處理單一梯次
router.patch('/:id', forbidDemo, adminDeparturesController.patchDeparture);
router.delete('/:id', forbidDemo, adminDeparturesController.deleteDeparture);

module.exports = router;
