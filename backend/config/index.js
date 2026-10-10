require('dotenv').config();
const db = require('./db');
const web = require('./web');
const secret = require('./secret');

const config = { db, web, secret };

// 啟動時就檢查必要的環境變數，缺了直接停止，不要等到有人登入才出錯。
// 正式環境要求比較嚴：資料庫連線不能用開發用的預設值、JWT 密鑰至少 32 字元、一定要指定前端網域
function validate() {
  const errors = [];
  if (!secret.jwtSecret) errors.push('JWT_SECRET 未設定');

  if (web.isProduction) {
    if (secret.jwtSecret && secret.jwtSecret.length < 32) errors.push('JWT_SECRET 至少要 32 字元');
    ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE', 'CORS_ORIGINS'].forEach((key) => {
      if (!process.env[key]) errors.push(`${key} 未設定`);
    });
  }

  if (errors.length) {
    throw new Error(`環境變數設定錯誤：${errors.join('、')}`);
  }
}

validate();

function get(path) {
  const keys = path.split('.');
  let result = config;
  for (const key of keys) {
    result = result[key];
    if (result === undefined) throw new Error(`Config path not found: ${path}`);
  }
  return result;
}

module.exports = { get };
