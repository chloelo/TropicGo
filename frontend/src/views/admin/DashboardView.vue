<script setup lang="ts">
  import { useAdminAuthStore } from '@/stores/admin-auth'

  const authStore = useAdminAuthStore()
</script>

<template>
  <n-card title="儀表板">
    <p>歡迎回來，{{ authStore.admin?.name }}。</p>
  </n-card>
</template>
