module.exports = {
  port: process.env.PORT || 8080,
  isProduction: process.env.NODE_ENV === 'production',
  // 允許呼叫 API 的前端網域，多個用逗號分隔
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
