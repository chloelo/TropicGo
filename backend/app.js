const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');
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

// 部署平台前面有一層代理，要信任它轉送的使用者 IP，登入次數限制才會以每個使用者計算，不會全部算成同一個 IP
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: config.get('web.corsOrigins') }));
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

// API 文件（Swagger UI）。servers 改成相對路徑，Try it out 會打到目前這台伺服器，本機和正式環境都不用另外設定
if (config.get('web.apiDocsEnabled')) {
  const openapi = YAML.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));
  openapi.servers = [{ url: '/api' }];
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));
}

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

// 全域錯誤處理（要有 4 個參數，Express 才會當成錯誤處理 middleware）。
// 有 status 的是預期內的錯誤（appError），訊息可以直接給前端；其他是預期外的錯誤，
// 訊息可能帶有資料庫的細節，只記在 log，前端只收到「伺服器錯誤」
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'failed', message: '請求內容格式錯誤' });
  }
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ status: 'failed', message: err.message });
  }
  console.error(err);
  res.status(500).json({ status: 'error', message: '伺服器錯誤' });
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
