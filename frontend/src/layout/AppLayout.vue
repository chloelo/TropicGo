<script setup lang="ts">
  import AppHeader from './AppHeader.vue'
  import AppSideMenu from './AppSideMenu.vue'
</script>

<template>
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
</template>
