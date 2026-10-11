# 開發文件

本機開發、常用指令、帳號密碼與正式環境的操作說明。

除非另外註明，指令都在專案根目錄執行。

## 目錄

- [本機開發](#本機開發)
- [環境變數](#環境變數)
- [常用指令](#常用指令)
- [資料庫 migration](#資料庫-migration)
- [API 規格與 Swagger](#api-規格與-swagger)
- [帳號與密碼](#帳號與密碼)
- [正式環境](#正式環境)

## 本機開發

### 環境需求

- Node.js 24（與 Render、Vercel 使用的版本相同）
- Docker Desktop（本機 PostgreSQL）

### 第一次啟動

```bash
docker compose up -d postgres

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

npm --prefix backend ci
npm --prefix frontend ci

npm --prefix backend run seed
npm --prefix backend run seed:tours
```

`.env` 的帳號密碼可以自行修改，但 `frontend/.env` 的 `VITE_DEMO_*` 要和 `backend/.env` 的 `DEMO_*` 一致，否則登入頁的「使用示範帳號登入」會失敗。

### 平常開發

```bash
# 電腦重開機後要先開 Docker Desktop，再啟動資料庫
docker compose up -d postgres

npm --prefix backend run dev
npm --prefix frontend run dev
```

| 服務 | 網址 |
| --- | --- |
| 前台 | http://localhost:5173 |
| 後台 | http://localhost:5173/admin/login |
| API | http://localhost:8080/api |
| API 文件 | http://localhost:8080/api-docs/ |

### 用 Docker 跑完整後端（選用）

想確認 Docker 映像檔能正常運作時使用，平常開發不需要。

```bash
docker compose up -d --build backend
```

會使用 `docker-compose.yml` 裡的環境變數，佔用 8080 port，要先停掉 `npm run dev` 的後端。

## 環境變數

範例與說明見 [backend/.env.example](../backend/.env.example)、[frontend/.env.example](../frontend/.env.example)。

### 後端

| 變數 | 說明 |
| --- | --- |
| `PORT` | 後端 port，預設 8080 |
| `NODE_ENV` | 正式環境設為 `production`，會啟用較嚴格的設定檢查 |
| `DB_HOST`、`DB_PORT`、`DB_USERNAME`、`DB_PASSWORD`、`DB_DATABASE` | 資料庫連線 |
| `DB_ENABLE_SSL` | 連線是否使用 SSL，Neon 要設為 `true` |
| `DB_SYNCHRONIZE` | 固定為 `false`，資料表結構由 migration 管理 |
| `JWT_SECRET` | JWT 簽章密鑰，正式環境至少 32 字元 |
| `JWT_EXPIRES_DAY` | 登入有效期限，預設 `1d` |
| `CORS_ORIGINS` | 允許呼叫 API 的前端網域，多個用逗號分隔 |
| `API_DOCS_ENABLED` | 是否開啟 `/api-docs`。不設定時開發環境開啟、正式環境關閉 |
| `ADMIN_EMAIL`、`ADMIN_PASSWORD` | 管理員帳密，只給 seed 和 reset-password 使用 |
| `DEMO_EMAIL`、`DEMO_PASSWORD` | 示範帳號帳密，只給 seed 和 reset-password 使用 |

正式環境（`NODE_ENV=production`）缺少 `JWT_SECRET`、資料庫連線或 `CORS_ORIGINS` 時，伺服器會直接拒絕啟動。

### 前端

| 變數 | 說明 |
| --- | --- |
| `VITE_API_BASE_URL` | API 位址，結尾為 `/api` |
| `VITE_SITE_URL` | 網站網址，用於分享預覽，結尾不加斜線 |
| `VITE_DEMO_EMAIL`、`VITE_DEMO_PASSWORD` | 登入頁「使用示範帳號登入」的帳密，不設定就不顯示按鈕 |

`VITE_` 開頭的變數會在 build 時寫進前端程式，任何人都看得到，不能放機密資料。示範帳號是唯讀的，所以可以放。

## 常用指令

### 後端（`npm --prefix backend run <指令>`，或在 `backend/` 裡 `npm run <指令>`）

| 指令 | 說明 |
| --- | --- |
| `dev` | 啟動開發伺服器，修改程式會自動重啟 |
| `start` | 以一般模式啟動，修改程式不會自動重啟 |
| `seed` | 建立初始資料：地區、優惠券、管理員和示範帳號。已存在的資料不會改動 |
| `seed:tours` | 同步產品範例資料。**會覆蓋既有產品、刪除不在範例裡的產品**，見下方說明 |
| `reset-password -- admin`／`-- demo` | 把帳號密碼重設成 `.env` 裡的值 |
| `seed:neon` | 對正式資料庫執行 `seed`，見[正式環境](#正式環境) |
| `reset-password:neon -- admin`／`-- demo` | 重設正式環境的帳號密碼，見[正式環境](#正式環境) |
| `migration:generate -- db/migrations/<名稱>` | 依 entity 的變更產生 migration |
| `migration:run` | 執行還沒跑過的 migration |
| `migration:revert` | 還原最後一個 migration |
| `format` | Prettier 格式化 |

### 前端（`npm --prefix frontend run <指令>`）

| 指令 | 說明 |
| --- | --- |
| `dev` | 啟動開發伺服器 |
| `build` | 型別檢查並打包 |
| `preview` | 預覽打包結果 |
| `type-check` | TypeScript 型別檢查 |
| `gen-api` | 依 `backend/openapi.yaml` 重新產生 API client |
| `lint` | ESLint 檢查並自動修正 |
| `format` | Prettier 格式化 |

### seed:tours 的注意事項

`seed:tours` 會把資料庫的產品同步成 `backend/scripts/seed-tours.js` 裡的範例資料：

- 已存在的產品，欄位和圖片會整組被覆蓋
- 不在範例裡的產品會被刪除（有訂單引用的保留）

因此在後台新增或修改過的產品，執行後都會不見。連到本機以外的資料庫時，指令會拒絕執行；必須加上 `--allow-remote` 才會執行，正式環境上線後不應再使用。

## 資料庫 migration

資料表結構由 migration 管理（`DB_SYNCHRONIZE=false`）。後端連線資料庫時會自動執行還沒跑過的 migration（`migrationsRun: true`），所以部署和 seed 前都不用另外執行。

修改資料表的流程：

1. 修改 `backend/entities/` 裡的 entity
2. 產生 migration（名稱用英文描述變更內容）：

   ```bash
   cd backend
   npm run migration:generate -- db/migrations/AddTourSlug
   ```

3. 檢查產生的檔案內容是否正確
4. 重新啟動後端，migration 會自動執行
5. commit entity 和 migration 檔案，部署後正式環境也會自動執行

## API 規格與 Swagger

API 規格寫在 [backend/openapi.yaml](../backend/openapi.yaml)，前端的 API client 和 Swagger 文件都由它產生。

### 修改 API 時

1. 修改 `backend/openapi.yaml`
2. 修改後端程式
3. 重新產生前端 API client 並格式化：

   ```bash
   npm --prefix frontend run gen-api
   npm --prefix frontend run format
   ```

4. 依型別錯誤修正前端程式（`npm --prefix frontend run type-check`）

規格和實際行為不一致時，線上 Swagger 文件就會是錯的，所以修改 API 一定要同步更新規格。

### 在 Swagger 試打需要登入的 API

1. 在前端後台登入
2. 開 DevTools（F12）→ Network，點後台的任一頁（例如產品管理）
3. 點 `tours?page=1` 這類後台 API 請求 → Headers → Request Headers → `Authorization`，按右鍵 Copy value
   - 也可以從 Application → Local Storage → `tropicgo_admin_token` 複製（這裡沒有 `Bearer ` 前綴）
4. 開 Swagger 頁面，按右上角 Authorize，貼上 token（刪掉前面的 `Bearer `），按 Authorize 再按 Close

token 有效期限 1 天。本機和正式環境的 token 不能互用（資料庫和 `JWT_SECRET` 都不同）。

## 帳號與密碼

後台登入比對的是資料庫裡的帳號，不是 `.env`。`.env` 的 `ADMIN_*`、`DEMO_*` 只在執行指令時使用：

| 情境 | 做法 |
| --- | --- |
| 建立帳號 | `seed`：帳號不存在才建立，已存在的帳號不會被改動 |
| 改密碼、忘記密碼 | 改 `.env` 的密碼，再執行 `reset-password -- admin`（或 `-- demo`） |

本機改密碼：

```bash
# 1. 修改 backend/.env 的 ADMIN_PASSWORD
# 2. 重設
npm --prefix backend run reset-password -- admin
```

改示範帳號（`demo`）的密碼時，前端的 `VITE_DEMO_PASSWORD` 也要改成一樣（本機改 `frontend/.env`，正式環境改 Vercel 的環境變數並重新部署）。

改 email 後執行 `seed` 會建立新帳號，舊帳號仍會留在資料庫。

## 正式環境

### 服務

| 服務 | 用途 | 設定 |
| --- | --- | --- |
| Vercel | 前端 | 根目錄 `frontend`，Vite preset，Node.js 24.x；`frontend/vercel.json` 讓所有路徑導回 `index.html` |
| Render | 後端 | 根目錄 `backend`，Docker，Singapore，Free；健康檢查 `/healthcheck` |
| Neon | PostgreSQL | Singapore，Postgres 18 |
| UptimeRobot | 監控 | 每 5 分鐘呼叫 `/healthcheck`，同時讓 Render 免費方案不休眠 |

### 部署

push 到 `main` 後，Vercel 和 Render 會自動部署。資料表 migration 會在後端啟動時自動執行。

只改環境變數時：

- Render：Environment 頁面儲存時選 **Save, rebuild, and deploy**
- Vercel：環境變數只在 build 時讀取，改完要到 Deployments 對最新一筆 Redeploy

### 環境變數

**Render（後端）**：`NODE_ENV=production`、`JWT_SECRET`（用 Render 的 Generate 產生）、`DB_HOST`、`DB_PORT`、`DB_USERNAME`、`DB_PASSWORD`、`DB_DATABASE`、`DB_ENABLE_SSL=true`、`DB_SYNCHRONIZE=false`、`CORS_ORIGINS=https://tropicgo.vercel.app`、`API_DOCS_ENABLED=true`

**Vercel（前端）**：`VITE_API_BASE_URL=https://tropicgo-api.onrender.com/api`、`VITE_SITE_URL=https://tropicgo.vercel.app`、`VITE_DEMO_EMAIL`、`VITE_DEMO_PASSWORD`

### 對正式資料庫執行指令

在自己的電腦執行，指令透過 `backend/.env.neon.local` 的連線資料直接連到 Neon。這個檔案已被 gitignore，只存在本機，內容包含：

```
DB_HOST、DB_PORT、DB_USERNAME、DB_PASSWORD、DB_DATABASE、DB_ENABLE_SSL、DB_SYNCHRONIZE、
ADMIN_EMAIL、ADMIN_PASSWORD、DEMO_EMAIL、DEMO_PASSWORD
```

| 指令（在 `backend/` 執行） | 說明 |
| --- | --- |
| `npm run seed:neon` | 建立缺少的初始資料，不會改動已存在的資料 |
| `npm run reset-password:neon -- admin` | 把正式環境的管理員密碼重設成 `.env.neon.local` 裡的值 |

注意事項：

- 這些指令會立刻改到正式資料
- `.env.neon.local` 的密碼要保持和正式環境一致；寫錯的話，`reset-password:neon` 會把正式環境的密碼改成錯的值（修正檔案後再執行一次即可）
- `.env.neon.local` 不存在時指令會直接報錯，不會改連其他資料庫
- 不要對正式環境執行 `seed:tours`，後台修改過的產品會被覆蓋或刪除

### Render 免費方案

- 閒置約 15 分鐘會休眠，UptimeRobot 每 5 分鐘呼叫一次讓它保持運作
- 每月 750 小時的免費額度，一個服務整月不休眠約 744 小時；在 Render 多開服務會超過額度
