const router = require('express').Router();
const adminAuthController = require('../controllers/adminAuth');
const isAuth = require('../middlewares/isAuth');

router.post('/login', adminAuthController.login);
router.get('/check', isAuth, adminAuthController.check);

module.exports = router;
