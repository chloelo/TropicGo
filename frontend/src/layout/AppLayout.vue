<script setup lang="ts">
  import { useAdminAuthStore } from '@/stores/admin-auth'
  import { adminThemeOverrides } from '@/utils/naive-theme'
  import AppHeader from './AppHeader.vue'
  import AppSideMenu from './AppSideMenu.vue'

  const authStore = useAdminAuthStore()
</script>

<template>
  <!-- 疊在 App.vue 的共用主題上：後台按鈕用綠色、選單選中用赤陶色（abstract：不多包一層 div）。
       後台自己再放一個 n-dialog-provider：App.vue 那個在這層外面，用它跳出的確認框會套到前台的主題 -->
  <n-config-provider :theme-overrides="adminThemeOverrides" abstract>
    <n-dialog-provider>
      <n-layout has-sider class="h-screen">
        <n-layout-sider bordered :width="200">
          <AppSideMenu />
        </n-layout-sider>
        <n-layout>
          <AppHeader />
          <n-layout-content class="p-6 bg-gray-50">
            <n-alert v-if="authStore.isDemo" type="warning" class="mb-4">
              目前使用示範帳號：可以瀏覽所有頁面和表單內容，但無法新增、修改或刪除資料。
            </n-alert>
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-dialog-provider>
  </n-config-provider>
</template>
