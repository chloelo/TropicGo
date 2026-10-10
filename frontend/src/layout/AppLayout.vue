<script setup lang="ts">
  import { adminThemeOverrides } from '@/utils/naive-theme'
  import AppHeader from './AppHeader.vue'
  import AppSideMenu from './AppSideMenu.vue'
</script>

<template>
  <!-- 疊在 App.vue 的共用主題上:後台按鈕用綠色、選單選中用赤陶色(abstract:不多包一層 div)。
       後台自己再放一個 n-dialog-provider:App.vue 那個在這層外面,用它跳出的確認框吃到的是前台的主題,不是後台的 -->
  <n-config-provider :theme-overrides="adminThemeOverrides" abstract>
    <n-dialog-provider>
      <n-layout has-sider class="h-screen">
        <n-layout-sider bordered :width="200">
          <AppSideMenu />
        </n-layout-sider>
        <n-layout>
          <AppHeader />
          <n-layout-content class="p-6 bg-gray-50">
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-dialog-provider>
  </n-config-provider>
</template>
