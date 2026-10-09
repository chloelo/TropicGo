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
  synchronize: config.get('db.synchronize'),
  ssl: config.get('db.ssl'),
  entities: [Region, Tour, TourImage, Coupon, Admin, Order, OrderItem],
});

module.exports = { dataSource };
