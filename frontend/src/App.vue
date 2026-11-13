<script setup lang="ts">
  import { dateZhTW, zhTW } from 'naive-ui'
  import { themeOverrides } from '@/utils/naive-theme'
</script>

<template>
  <!-- locale：元件內建文字（無資料、確認按鈕、分頁）；date-locale：日期選擇器的月份、星期。
       網站只有繁體中文，固定用 zhTW；之後要多語系再改成跟著 vue-i18n 切換 -->
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhTW"
    :date-locale="dateZhTW"
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
