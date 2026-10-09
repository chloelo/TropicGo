# TropicGo 熱趣

[線上預覽](https://tropicgo.vercel.app/)（部署後更新為實際網址）

熱帶旅遊電商網站。前身是純前端的 Vue 2 練習作品([main 分支](https://github.com/chloelo/TropicGo)),因原本串接的第三方課程 API 已下架,這個版本重新打造成有真實資料庫的全端專案——視覺設計保留原樣,技術全部換成目前實際工作中使用的規格。

## 使用技術

**前端**

- Vue 3 + Vite + TypeScript
- Pinia(購物車狀態管理)
- Vue Router
- Naive UI
- UnoCSS
- Axios(透過 OpenAPI 規格自動產生型別化的 API client)

**後端**

- Node.js + Express
- TypeORM + PostgreSQL
- JWT 身份驗證(後台登入)
- Swagger / OpenAPI API 文件

## 功能

- 前台:行程瀏覽與地區篩選、行程詳情、購物車、優惠券折扣、訂單建立、我的收藏
- 後台:JWT 登入保護、行程 / 優惠券 / 訂單管理(CRUD)
