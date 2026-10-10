const express = require('express');
const cors = require('cors');
const config = require('./config');

const { dataSource } = require('./db/data-source');
const appError = require('./utils/appError');

const regionsRouter = require('./routes/regions');
const adminAuthRouter = require('./routes/adminAuth');
const toursRouter = require('./routes/tours');
const adminToursRouter = require('./routes/adminTours');
const couponsRouter = require('./routes/coupons');
const adminCouponsRouter = require('./routes/adminCoupons');
const ordersRouter = require('./routes/orders');
const adminOrdersRouter = require('./routes/adminOrders');

const app = express();

app.use(cors());
app.use(express.json());

// 健康檢查（不是 JSON、不在 /api 底下），給 Docker healthcheck 和部署平台使用
app.get('/healthcheck', async (req, res) => {
  try {
    await dataSource.query('SELECT 1');
    res.status(200).send('OK');
  } catch {
    res.status(503).send('Service Unavailable');
  }
});

// 路由
app.use('/api/regions', regionsRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/tours', toursRouter);
app.use('/api/admin/tours', adminToursRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/admin/coupons', adminCouponsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin/orders', adminOrdersRouter);

// 404
app.use((req, res, next) => {
  next(appError(404, '無此路由'));
});

// 全域錯誤處理（要有 4 個參數，Express 才會當成錯誤處理 middleware）
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode === 500 ? 'error' : 'failed',
    message: err.message || '伺服器錯誤',
  });
});

dataSource
  .initialize()
  .then(() => {
    app.listen(config.get('web.port'), () => {
      console.log(`Server running on port ${config.get('web.port')}`);
    });
  })
  .catch((err) => {
    console.error('資料庫連線失敗', err);
    process.exit(1);
  });
