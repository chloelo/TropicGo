const isValidString = (value) => typeof value === 'string' && value.trim() !== '';

const isInteger = (value) => typeof value === 'number' && Number.isInteger(value);

const isNonNegativeInteger = (value) =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;

// 英文大寫、小寫和數字，長度 8～16 字
const isValidPassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test(value);

module.exports = {
  isValidString,
  isInteger,
  isNonNegativeInteger,
  isValidPassword,
};
