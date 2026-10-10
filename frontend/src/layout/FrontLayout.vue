<script setup lang="ts">
  import AppLoader from '@/components/front/AppLoader.vue'
  import AppToasts from '@/components/front/AppToasts.vue'
  import ToTop from '@/components/front/ToTop.vue'
  import FrontFooter from './FrontFooter.vue'
  import FrontHeader from './FrontHeader.vue'
</script>

<template>
  <!-- Naive UI 的主題色(赤陶色)在 App.vue 統一設定,前台後台共用。
       App.vue 的 n-config-provider 會把預設字級設成 14px / 行高 1.6(Naive UI 自己的設計系統),
       舊版 Bootstrap 是 16px / 1.5,在這層統一蓋回來,前台頁面不用各自補 text-base。
       Naive UI 的元件用自己的 CSS 變數設定字級,彈窗/popover 也是掛在 body 底下,不受影響 -->
  <div class="min-h-screen flex flex-col text-[16px] leading-[1.5]">
    <!-- Header 是 fixed、疊在內容最上層,不佔版面空間——每個前台頁面開頭都是 Hero,
         要讓 Hero 從最頂端(y=0)開始畫,header 才能透明疊在 Hero 圖上,滾動後才變白底 -->
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
