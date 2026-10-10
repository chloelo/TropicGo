import { useLoadingStore } from '@/stores/loading'
import { Api } from './tropicgo-api'

const TOKEN_KEY = 'tropicgo_admin_token'

/** 後台登入的 token，存在 localStorage */
export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/** 儲存或清除 token，同時更新 API 呼叫時帶的 token */
export function setAdminToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
  api.setSecurityData(token)
}

/** 由 openapi.yaml 產生的 API client；需要登入的後台 API 會自動帶上 token */
export const api = new Api({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Bearer ${token as string}` } } : {},
})

api.setSecurityData(getAdminToken())

// 全域載入遮罩：每支 API 請求開始時加 1，結束（成功或失敗）時減 1
api.instance.interceptors.request.use((config) => {
  useLoadingStore().start()
  return config
})
api.instance.interceptors.response.use(
  (response) => {
    useLoadingStore().stop()
    return response
  },
  (error) => {
    useLoadingStore().stop()
    return Promise.reject(error)
  },
)
