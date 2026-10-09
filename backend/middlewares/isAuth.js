const jwt = require('jsonwebtoken');
const { dataSource } = require('../db/data-source');
const config = require('../config');
const appError = require('../utils/appError');

async function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(appError(401, '請先登入'));
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.get('secret.jwtSecret'));

    const adminRepo = dataSource.getRepository('Admin');
    const findAdmin = await adminRepo.findOneBy({ id: decoded.id });
    if (!findAdmin) {
      return next(appError(401, '無效的 token'));
    }

    req.admin = findAdmin;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(appError(401, 'Token 已過期'));
    }
    return next(appError(401, '無效的 token'));
  }
}
module.exports = isAuth;
