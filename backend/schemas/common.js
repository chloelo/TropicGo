const { z } = require('zod');

/**
 * 必填字串：去掉前後空白後不能是空的，長度不能超過資料庫欄位的長度（超過的話寫入時會變成 500）
 * @param {{ required: string, max?: number, tooLong?: string }} messages
 */
const requiredString = ({ required, max, tooLong }) => {
  const schema = z.string({ error: required }).trim().min(1, required);
  return max === undefined ? schema : schema.max(max, tooLong);
};

/**
 * 整數，範圍限制在 PostgreSQL integer 欄位存得下的範圍內（超過的話寫入時會變成 500）
 * @param {string} message
 */
const integer = (message) => z.int32({ error: message });

/**
 * YYYY-MM-DD 格式而且是真的存在的日期（會擋掉 2027-02-30 這種）
 * @param {string} message
 */
const dateString = (message) => z.iso.date({ error: message });

module.exports = { requiredString, integer, dateString };
