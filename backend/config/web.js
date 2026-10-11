module.exports = {
  port: process.env.PORT || 8080,
  isProduction: process.env.NODE_ENV === 'production',
  // 允許呼叫 API 的前端網域，多個用逗號分隔
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  // API 文件頁面（/api-docs）：沒設定時開發環境開啟、正式環境關閉，要公開就設 API_DOCS_ENABLED=true
  apiDocsEnabled:
    process.env.API_DOCS_ENABLED === undefined
      ? process.env.NODE_ENV !== 'production'
      : process.env.API_DOCS_ENABLED === 'true',
};
