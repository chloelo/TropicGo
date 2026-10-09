// scripts/seed.js — 塞入開發用的基本資料(地區 + 一個管理員帳號)
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { dataSource } = require('../db/data-source');

const REGIONS = [
  { name: '亞洲', slug: 'asia' },
  { name: '美洲', slug: 'america' },
  { name: '非洲', slug: 'africa' },
  { name: '大洋洲', slug: 'oceania' },
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
