/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_SITE_URL: string
  // 後台登入頁「使用示範帳號登入」用的帳密（公開的唯讀帳號），沒設定就不顯示按鈕
  readonly VITE_DEMO_EMAIL?: string
  readonly VITE_DEMO_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
