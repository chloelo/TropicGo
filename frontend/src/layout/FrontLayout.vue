<script setup lang="ts">
  import AppLoader from '@/components/front/AppLoader.vue'
  import AppToasts from '@/components/front/AppToasts.vue'
  import ToTop from '@/components/front/ToTop.vue'
  import FrontFooter from './FrontFooter.vue'
  import FrontHeader from './FrontHeader.vue'
</script>

<template>
  <!-- App.vue 的 n-config-provider 把字級設成 14px／行高 1.6（Naive UI 預設），前台在這層統一改回 16px／1.5；
       Naive UI 的元件用自己的 CSS 變數設定字級，不受影響 -->
  <div class="min-h-screen flex flex-col text-[16px] leading-[1.5]">
    <!-- header 是 fixed、不佔版面空間：每頁開頭的 Hero 要從最頂端開始畫，header 才能透明疊在上面 -->
    <FrontHeader />
    <div class="flex-1">
      <router-view />
    </div>
    <FrontFooter />
    <ToTop />
    <AppToasts />
    <AppLoader />
  </div>
</template>
