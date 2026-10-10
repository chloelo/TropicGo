const appError = require('../utils/appError');

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * 給 router.param('id', ...) 用：網址裡的 id 不是 UUID 格式就直接回 400。
 * 不先擋的話，格式錯誤的 id 送進資料庫查詢會變成 500，錯誤訊息還會帶出資料庫的細節
 */
function checkUuidParam(req, res, next, value) {
  if (!UUID_PATTERN.test(value)) return next(appError(400, '找不到這筆資料'));
  next();
}

module.exports = checkUuidParam;
