import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, getAdminToken, setAdminToken } from '@/api/client'
import type { Admin } from '@/api/tropicgo-api'

/** 後台登入狀態，token 存在 localStorage */
export const useAdminAuthStore = defineStore('admin-auth', () => {
  const admin = ref<Admin | null>(null)
  const checked = ref(false)
  /** token 過期被登出（使用中，或重新打開網站時）：登入頁看到這個狀態會顯示原因，重新登入後清掉 */
  const sessionExpired = ref(false)

  const isLoggedIn = computed(() => !!admin.value)
  /** 示範帳號只能瀏覽：前端用來停用按鈕、把表單改成唯讀，真正的權限檢查在後端 */
  const isDemo = computed(() => admin.value?.role === 'demo')

  async function login(email: string, password: string) {
    const { data } = await api.admin.adminLogin({ email, password })
    setAdminToken(data.data.token)
    admin.value = data.data.admin
    sessionExpired.value = false
  }

  function logout() {
    setAdminToken(null)
    admin.value = null
  }

  /** 使用中 token 過期（後台 API 回 401）時呼叫：清掉登入狀態，並記下是過期，不是自己登出 */
  function expireSession() {
    logout()
    sessionExpired.value = true
  }

  /** app 啟動時呼叫一次：localStorage 有 token 的話，向後端確認是否還有效 */
  async function checkAuth() {
    if (!getAdminToken()) {
      checked.value = true
      return
    }
    try {
      const { data } = await api.admin.adminCheck()
      admin.value = data.data
    } catch (error) {
      setAdminToken(null)
      admin.value = null
      // 存著的 token 已失效（例如隔天再打開網站），登入頁顯示逾時說明；連不到後端之類的錯誤不算
      if (isAxiosError(error) && error.response?.status === 401) sessionExpired.value = true
    } finally {
      checked.value = true
    }
  }

  return {
    admin,
    isLoggedIn,
    isDemo,
    checked,
    sessionExpired,
    login,
    logout,
    expireSession,
    checkAuth,
  }
})
