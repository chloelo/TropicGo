const appError = require('../utils/appError');

/**
 * 用 zod schema 驗證 req.body，失敗時回 400 和第一個錯誤的訊息。
 * 通過的話把 req.body 換成驗證後的資料：字串去掉前後空白，schema 沒定義的欄位會被拿掉
 * @param {import('zod').ZodType} schema
 */
const validateBody = (schema) => (req, res, next) => {
  // 沒帶 body 或不是 JSON 時 req.body 是 undefined，當成空物件驗證，才會回「請輸入○○」
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) return next(appError(400, result.error.issues[0].message));
  req.body = result.data;
  next();
};

module.exports = validateBody;
