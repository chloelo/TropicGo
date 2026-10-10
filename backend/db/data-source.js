const path = require('path');
const { DataSource } = require('typeorm');
const config = require('../config');

const Region = require('../entities/Region');
const Tour = require('../entities/Tour');
const TourImage = require('../entities/TourImage');
const Coupon = require('../entities/Coupon');
const Admin = require('../entities/Admin');
const Order = require('../entities/Order');
const OrderItem = require('../entities/OrderItem');

const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('db.host'),
  port: Number(config.get('db.port')),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  // 資料表結構改用 migration 管理，不讓 TypeORM 依 entity 自動改表（可能直接刪掉欄位、遺失資料）
  synchronize: config.get('db.synchronize'),
  ssl: config.get('db.ssl'),
  entities: [Region, Tour, TourImage, Coupon, Admin, Order, OrderItem],
  migrations: [path.join(__dirname, 'migrations', '*.js')],
  // 連線時自動執行還沒跑過的 migration：部署後第一次啟動、npm run seed 前都不用另外下指令
  migrationsRun: true,
});

module.exports = { dataSource };
