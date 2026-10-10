// JWT_SECRET 沒有預設值：正式環境忘了設定的話，config/index.js 會直接讓伺服器啟動失敗
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresDay: process.env.JWT_EXPIRES_DAY || '1d',
};
