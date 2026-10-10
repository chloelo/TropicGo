const { rateLimit } = require('express-rate-limit');

const limited = (message) => ({ status: 'failed', message });

/** 後台登入：每個 IP 15 分鐘內最多失敗 5 次，登入成功不計入 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: limited('登入失敗次數過多，請 15 分鐘後再試'),
});

/** 不用登入就能寫入的 API（建立訂單、付款、驗證優惠碼）：每個 IP 每分鐘最多 20 次 */
const publicWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: limited('操作太頻繁，請稍後再試'),
});

module.exports = { loginLimiter, publicWriteLimiter };
