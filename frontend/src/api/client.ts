import { useLoadingStore } from '@/stores/loading'
import { Api } from './tropicgo-api'

const TOKEN_KEY = 'tropicgo_admin_token'

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
  api.setSecurityData(token)
}

// 後台路由(openapi.yaml 裡標 security: bearerAuth 的那些)呼叫時會自動帶上這裡設定的 token
export const api = new Api({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Bearer ${token as string}` } } : {},
})

api.setSecurityData(getAdminToken())

// 全域 loading 遮罩:每支 API 請求開始時 +1、結束(成功或失敗)時 -1
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
