const router = require('express').Router();
const adminAuthController = require('../controllers/adminAuth');
const isAuth = require('../middlewares/isAuth');
const { loginLimiter } = require('../middlewares/rateLimit');

router.post('/login', loginLimiter, adminAuthController.login);
router.get('/check', isAuth, adminAuthController.check);

module.exports = router;
