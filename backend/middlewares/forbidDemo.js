const appError = require('../utils/appError');

/** 接在 isAuth 後面：示範帳號只能瀏覽，新增、修改、刪除一律回 403 */
function forbidDemo(req, res, next) {
  if (req.admin.role === 'demo') {
    return next(appError(403, '示範帳號只能瀏覽，無法新增、修改或刪除資料'));
  }
  next();
}

module.exports = forbidDemo;
