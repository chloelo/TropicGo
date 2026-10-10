// 基本資料：地區、優惠券、管理員和示範帳號
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { dataSource } = require('../db/data-source');

const REGIONS = [
  { name: '亞洲', slug: 'asia' },
  { name: '美洲', slug: 'america' },
  { name: '非洲', slug: 'africa' },
  { name: '大洋洲', slug: 'oceania' },
];

// 從今天往後算幾年，日期不寫死
function yearsFromNow(years) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date;
}

// 首頁「最新優惠」彈窗圖片上寫的折扣碼（percent 是要付的百分比，90 代表打 9 折），到期日是執行 seed 當天起算 5 年
const COUPONS = [
  {
    title: '全站 9 折優惠',
    code: 'tropicgo90',
    percent: 90,
    due_date: yearsFromNow(5),
    is_enabled: true,
  },
];

// 帳號密碼從環境變數讀，不寫在程式碼裡（repo 是公開的）。
// 管理員是完整權限；示範帳號只能瀏覽，帳號密碼會寫在 README 給面試官登入看後台
const ACCOUNTS = [
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: '管理員',
    role: 'admin',
  },
  {
    email: process.env.DEMO_EMAIL,
    password: process.env.DEMO_PASSWORD,
    name: '示範帳號',
    role: 'demo',
  },
];

async function seed() {
  await dataSource.initialize();

  const regionRepo = dataSource.getRepository('Region');
  for (const region of REGIONS) {
    const exists = await regionRepo.findOneBy({ slug: region.slug });
    if (!exists) {
      await regionRepo.save(region);
      console.log(`+ Region: ${region.name}`);
    }
  }

  const couponRepo = dataSource.getRepository('Coupon');
  for (const coupon of COUPONS) {
    const exists = await couponRepo.findOneBy({ code: coupon.code });
    if (!exists) {
      await couponRepo.save(coupon);
      console.log(`+ Coupon: ${coupon.code}`);
    }
  }

  const adminRepo = dataSource.getRepository('Admin');
  for (const account of ACCOUNTS) {
    if (!account.email || !account.password) {
      console.log(`! 略過 ${account.role} 帳號：環境變數沒有設定帳號或密碼`);
      continue;
    }
    const exists = await adminRepo.findOneBy({ email: account.email });
    if (exists) {
      console.log(`= 帳號已存在：${account.email}`);
      continue;
    }
    const hashed = await bcrypt.hash(account.password, 10);
    await adminRepo.save({ ...account, password: hashed });
    console.log(`+ 建立 ${account.role} 帳號：${account.email}`);
  }

  await dataSource.destroy();
  console.log('Seed 完成');
}

seed().catch((err) => {
  console.error('Seed 失敗', err);
  process.exit(1);
});
