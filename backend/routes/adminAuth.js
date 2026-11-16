const router = require('express').Router();
const adminAuthController = require('../controllers/adminAuth');
const isAuth = require('../middlewares/isAuth');
const validateBody = require('../middlewares/validateBody');
const { loginSchema } = require('../schemas/auth');
const { loginLimiter } = require('../middlewares/rateLimit');

router.post('/login', loginLimiter, validateBody(loginSchema), adminAuthController.login);
router.get('/check', isAuth, adminAuthController.check);

module.exports = router;
