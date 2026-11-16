const { z } = require('zod');
const { requiredString, integer } = require('./common');

// 付款方式的選項（存英文代碼，畫面上的中文由前端 utils/payment.ts 對應），
// 跟 openapi.yaml 的 OrderInput.payment_method enum 要一致
const PAYMENT_METHODS = ['Credit', 'LinePay', 'ApplePay', 'GooglePay', 'ATM', 'CVS'];

// 每筆訂單裡同一個梯次最多報名的人數，跟前端 stores/cart.ts 的 MAX_QUANTITY、openapi.yaml 要一致
const MAX_QUANTITY = 20;

// 訂單狀態，跟 openapi.yaml 的 Order.status enum 要一致
const ORDER_STATUSES = ['PENDING', 'PAID', 'CANCELLED', 'COMPLETED'];

const orderItemSchema = z.object({
  departure_id: z.guid({ error: '請選擇出發日期' }),
  quantity: integer('數量格式錯誤')
    .min(1, '數量格式錯誤')
    .max(MAX_QUANTITY, `同一個梯次最多報名 ${MAX_QUANTITY} 人`),
});

// POST /api/orders，長度上限跟 entities/Order.js 的欄位長度一致
const orderSchema = z.object({
  customer_name: requiredString({ required: '請輸入姓名', max: 50, tooLong: '姓名最多 50 字' }),
  customer_email: requiredString({
    required: '請輸入 Email',
    max: 100,
    tooLong: 'Email 最多 100 字',
  }).pipe(z.email({ error: 'Email 格式錯誤' })),
  // 跟前端 CheckoutFormStep.vue 的規則一致
  customer_phone: requiredString({ required: '請輸入電話' }).regex(
    /^\d{8,10}$/,
    '電話須為 8～10 碼數字',
  ),
  customer_address: requiredString({
    required: '請輸入地址',
    max: 255,
    tooLong: '地址最多 255 字',
  }),
  payment_method: z.enum(PAYMENT_METHODS, { error: '請選擇付款方式' }),
  message: z.string({ error: '備註格式錯誤' }).nullish(),
  coupon_code: z.string({ error: '優惠碼格式錯誤' }).max(50, '優惠碼無效或已過期').nullish(),
  items: z
    .array(orderItemSchema, { error: '購物車是空的' })
    .min(1, '購物車是空的')
    // 同一個梯次分成多筆會繞過每筆的人數上限，要求合併成一筆
    .refine(
      (items) => new Set(items.map((item) => item.departure_id)).size === items.length,
      '同一個梯次請合併成一筆',
    ),
});

// PATCH /api/admin/orders/:id/status
const orderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES, { error: `狀態必須是 ${ORDER_STATUSES.join('/')} 其中之一` }),
});

module.exports = { orderSchema, orderStatusSchema };
