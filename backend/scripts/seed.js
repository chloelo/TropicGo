// 開發用的基本資料：地區、優惠券、一個管理員帳號
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { dataSource } = require('../db/data-source');

const REGIONS = [
  { name: '亞洲', slug: 'asia' },
  { name: '美洲', slug: 'america' },
  { name: '非洲', slug: 'africa' },
  { name: '大洋洲', slug: 'oceania' },
];

// 首頁「最新優惠」彈窗圖片上寫的折扣碼（percent 是要付的百分比，90 代表打 9 折）
const COUPONS = [
  {
    title: '全站 9 折優惠',
    code: 'tropicgo90',
    percent: 90,
    due_date: new Date('2030-12-31T23:59:59+08:00'),
    is_enabled: true,
  },
];

const ADMIN = {
  email: 'admin@tropicgo.test',
  password: 'Tropic2026',
  name: '管理員',
};

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
  const existsAdmin = await adminRepo.findOneBy({ email: ADMIN.email });
  if (!existsAdmin) {
    const hashed = await bcrypt.hash(ADMIN.password, 10);
    await adminRepo.save({ email: ADMIN.email, password: hashed, name: ADMIN.name });
    console.log(`+ Admin: ${ADMIN.email} / 密碼: ${ADMIN.password}`);
  } else {
    console.log(`= Admin 已存在: ${ADMIN.email}`);
  }

  await dataSource.destroy();
  console.log('Seed 完成');
}

seed().catch((err) => {
  console.error('Seed 失敗', err);
  process.exit(1);
});
