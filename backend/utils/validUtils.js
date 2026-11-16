const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 格式不是 UUID 的 id 送進 PostgreSQL 查詢會直接報錯，查詢前先擋下
const isUuid = (value) => typeof value === 'string' && UUID_PATTERN.test(value);

// 英文大寫、小寫和數字，長度 8～16 字
const isValidPassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test(value);

module.exports = {
  isUuid,
  isValidPassword,
};
