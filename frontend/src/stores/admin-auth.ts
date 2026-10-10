import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, getAdminToken, setAdminToken } from '@/api/client'
import type { Admin } from '@/api/tropicgo-api'

/** 後台登入狀態，token 存在 localStorage */
export const useAdminAuthStore = defineStore('admin-auth', () => {
  const admin = ref<Admin | null>(null)
  const checked = ref(false)

  const isLoggedIn = computed(() => !!admin.value)
  /** 示範帳號只能瀏覽：前端用來停用按鈕、把表單改成唯讀，真正的權限檢查在後端 */
  const isDemo = computed(() => admin.value?.role === 'demo')

  async function login(email: string, password: string) {
    const { data } = await api.admin.adminLogin({ email, password })
    setAdminToken(data.data.token)
    admin.value = data.data.admin
  }

  function logout() {
    setAdminToken(null)
    admin.value = null
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
    } catch {
      setAdminToken(null)
      admin.value = null
    } finally {
      checked.value = true
    }
  }

  return { admin, isLoggedIn, isDemo, checked, login, logout, checkAuth }
})
