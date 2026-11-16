const { z } = require('zod');
const { requiredString, integer } = require('./common');

// 出發城市的選項，跟 openapi.yaml 的 TourInput.departure_city enum 要一致
const DEPARTURE_CITIES = ['台北', '桃園', '台中', '高雄'];

// POST、PUT /api/admin/tours，長度上限跟 entities/Tour.js、TourImage.js 的欄位長度一致
const tourSchema = z.object({
  title: requiredString({ required: '請輸入行程名稱', max: 100, tooLong: '行程名稱最多 100 字' }),
  region_id: z.guid({ error: '請選擇地區' }),
  summary: requiredString({ required: '請輸入行程摘要', max: 255, tooLong: '行程摘要最多 255 字' }),
  description: requiredString({ required: '請輸入行程介紹' }),
  content: requiredString({ required: '請輸入費用包含說明' }),
  unit: requiredString({ required: '請輸入單位', max: 10, tooLong: '單位最多 10 字' }),
  departure_city: z.enum(DEPARTURE_CITIES, { error: '請選擇出發城市' }),
  min_group_size: integer('成團人數格式錯誤').min(1, '成團人數格式錯誤'),
  origin_price: integer('原價格式錯誤').min(0, '原價格式錯誤'),
  price: integer('優惠價格式錯誤').min(0, '優惠價格式錯誤'),
  is_popular: z.boolean({ error: '熱門推薦格式錯誤' }).optional(),
  is_enabled: z.boolean({ error: '上架狀態格式錯誤' }).optional(),
  images: z
    .array(
      requiredString({
        required: '請至少提供一張圖片',
        max: 2048,
        tooLong: '圖片網址最多 2048 字',
      }),
      { error: '請至少提供一張圖片' },
    )
    .min(1, '請至少提供一張圖片'),
});

module.exports = { tourSchema };
