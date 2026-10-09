const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dataSource } = require('../db/data-source');
const config = require('../config');
const appError = require('../utils/appError');
const { isValidString } = require('../utils/validUtils');

const adminAuthController = {
  // POST /api/admin/auth/login
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!isValidString(email) || !isValidString(password)) {
      return next(appError(400, '請輸入帳號密碼'));
    }

    const adminRepo = dataSource.getRepository('Admin');
    const admin = await adminRepo.findOneBy({ email });
    if (!admin) {
      return next(appError(400, '帳號或密碼錯誤'));
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(appError(400, '帳號或密碼錯誤'));
    }

    const token = jwt.sign({ id: admin.id }, config.get('secret.jwtSecret'), {
      expiresIn: config.get('secret.jwtExpiresDay'),
    });

    res.json({
      status: 'success',
      data: {
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      },
    });
  },

  // GET /api/admin/auth/check
  async check(req, res) {
    res.json({
      status: 'success',
      data: { id: req.admin.id, name: req.admin.name, email: req.admin.email },
    });
  },
};

module.exports = adminAuthController;
