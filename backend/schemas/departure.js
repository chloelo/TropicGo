const { z } = require('zod');
const { integer, dateString } = require('./common');

// POST /api/admin/tours/:id/departures
// 「出發日期必須晚於今天」要看當下的日期，由 controller 檢查
const departureSchema = z.object({
  departure_date: dateString('請輸入正確的出發日期'),
  capacity: integer('名額須為 1 以上的整數').min(1, '名額須為 1 以上的整數'),
  is_enabled: z.boolean({ error: '開放報名格式錯誤' }).optional(),
});

// PATCH /api/admin/departures/:id：只檢查有送的欄位
const departureUpdateSchema = departureSchema.partial();

module.exports = { departureSchema, departureUpdateSchema };
