// 重設後台帳號密碼，用於忘記密碼等緊急情況。
// 用法：npm run reset-password -- admin（或 demo），密碼讀環境變數 ADMIN_PASSWORD / DEMO_PASSWORD
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { dataSource } = require('../db/data-source');

const ACCOUNTS = {
  admin: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  demo: { email: process.env.DEMO_EMAIL, password: process.env.DEMO_PASSWORD },
};

async function resetPassword() {
  const role = process.argv[2];
  const account = ACCOUNTS[role];
  if (!account) {
    throw new Error('請指定要重設的帳號：npm run reset-password -- admin 或 demo');
  }
  if (!account.email || !account.password) {
    throw new Error(`環境變數沒有設定 ${role} 帳號的 email 或密碼`);
  }

  await dataSource.initialize();
  try {
    const adminRepo = dataSource.getRepository('Admin');
    const admin = await adminRepo.findOneBy({ email: account.email, role });
    if (!admin) {
      throw new Error(`找不到 ${role} 帳號：${account.email}`);
    }
    await adminRepo.update(admin.id, { password: await bcrypt.hash(account.password, 10) });
    console.log(`已重設 ${role} 帳號密碼：${account.email}`);
  } finally {
    await dataSource.destroy();
  }
}

resetPassword().catch((err) => {
  console.error('重設密碼失敗：', err.message);
  process.exit(1);
});
