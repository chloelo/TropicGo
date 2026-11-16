const { z } = require('zod');
const { requiredString } = require('./common');

// POST /api/admin/auth/login
const loginSchema = z.object({
  // 格式不對的帳號本來就不存在，跟查不到帳號時回一樣的訊息，不透露是哪裡錯
  email: requiredString({ required: '請輸入帳號密碼' }).pipe(z.email({ error: '帳號或密碼錯誤' })),
  // 密碼不去掉前後空白，原樣拿去比對
  password: z
    .string({ error: '請輸入帳號密碼' })
    .refine((value) => value.trim() !== '', '請輸入帳號密碼'),
});

module.exports = { loginSchema };
