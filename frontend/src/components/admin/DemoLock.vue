<script setup lang="ts">
  import { useAdminAuthStore } from '@/stores/admin-auth'

  const authStore = useAdminAuthStore()
</script>

<template>
  <!-- 包在示範帳號停用的按鈕外面，滑鼠移上去說明原因，不會被當成壞掉。
       停用的按鈕不會觸發滑鼠事件，所以提示掛在外層的 span 上 -->
  <n-tooltip :disabled="!authStore.isDemo">
    <template #trigger>
      <span class="inline-block"><slot /></span>
    </template>
    示範帳號只能瀏覽，無法使用此功能
  </n-tooltip>
</template>
