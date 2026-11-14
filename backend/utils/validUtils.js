const isValidString = (value) => typeof value === 'string' && value.trim() !== '';

const isInteger = (value) => typeof value === 'number' && Number.isInteger(value);

const isNonNegativeInteger = (value) =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 格式不是 UUID 的 id 送進 PostgreSQL 查詢會直接報錯，查詢前先擋下
const isUuid = (value) => typeof value === 'string' && UUID_PATTERN.test(value);

// YYYY-MM-DD 格式而且是真的存在的日期（擋掉 2027-02-30 這種）
const isDateString = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// 英文大寫、小寫和數字，長度 8～16 字
const isValidPassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test(value);

module.exports = {
  isValidString,
  isInteger,
  isNonNegativeInteger,
  isUuid,
  isDateString,
  isValidPassword,
};
