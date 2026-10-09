<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useAdminAuthStore } from '@/stores/admin-auth'

  const router = useRouter()
  const authStore = useAdminAuthStore()

  function handleLogout() {
    authStore.logout()
    router.push({ name: 'admin-login' })
  }
</script>

<template>
  <header class="h-14 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
    <span class="font-bold text-emerald-700">TropicGo 後台</span>
    <div class="flex items-center gap-3">
      <span class="text-sm text-gray-500">{{ authStore.admin?.name }}</span>
      <n-button size="small" @click="handleLogout">登出</n-button>
    </div>
  </header>
</template>
