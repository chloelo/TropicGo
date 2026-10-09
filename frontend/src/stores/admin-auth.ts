import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, getAdminToken, setAdminToken } from '@/api/client'

export interface AdminInfo {
  id: string
  name: string
  email: string
}

export const useAdminAuthStore = defineStore('admin-auth', () => {
  const admin = ref<AdminInfo | null>(null)
  const checked = ref(false)

  const isLoggedIn = computed(() => !!admin.value)

  async function login(email: string, password: string) {
    const { data } = await api.admin.adminLogin({ email, password })
    setAdminToken(data.data!.token!)
    admin.value = data.data!.admin as AdminInfo
  }

  function logout() {
    setAdminToken(null)
    admin.value = null
  }

  // app 啟動時呼叫一次:如果 localStorage 有 token,去後端驗證是否還有效
  async function checkAuth() {
    if (!getAdminToken()) {
      checked.value = true
      return
    }
    try {
      const { data } = await api.admin.adminCheck()
      admin.value = data.data as AdminInfo
    } catch {
      setAdminToken(null)
      admin.value = null
    } finally {
      checked.value = true
    }
  }

  return { admin, isLoggedIn, checked, login, logout, checkAuth }
})
