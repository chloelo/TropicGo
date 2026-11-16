const { z } = require('zod');
const { requiredString, integer, dateString } = require('./common');

// POST、PUT /api/admin/coupons，長度上限跟 entities/Coupon.js 的欄位長度一致
const couponSchema = z.object({
  title: requiredString({
    required: '請輸入優惠券名稱',
    max: 100,
    tooLong: '優惠券名稱最多 100 字',
  }),
  code: requiredString({ required: '請輸入優惠碼', max: 50, tooLong: '優惠碼最多 50 字' }),
  percent: integer('折扣百分比須為 1~100 的整數')
    .min(1, '折扣百分比須為 1~100 的整數')
    .max(100, '折扣百分比須為 1~100 的整數'),
  due_date: dateString('請輸入正確的到期日'),
  is_enabled: z.boolean({ error: '啟用狀態格式錯誤' }).optional(),
});

// POST /api/coupons/check
const couponCheckSchema = z.object({
  code: requiredString({ required: '請輸入優惠碼' }),
});

module.exports = { couponSchema, couponCheckSchema };
