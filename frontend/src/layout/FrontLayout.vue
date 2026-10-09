<script setup lang="ts">
  import type { GlobalThemeOverrides } from 'naive-ui'
  import AppLoader from '@/components/front/AppLoader.vue'
  import AppToasts from '@/components/front/AppToasts.vue'
  import ToTop from '@/components/front/ToTop.vue'
  import FrontFooter from './FrontFooter.vue'
  import FrontHeader from './FrontHeader.vue'

  // 前台專用的 Naive UI 主題覆寫,只影響這個子樹(後台維持 Naive UI 預設風格不受影響)
  // 色碼來自舊版 _variables.scss 的 $theme-colors(primary 實際被覆寫成 $africa 赤陶色)
  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#a36549',
      primaryColorHover: '#8f5940',
      primaryColorPressed: '#7a4c37',
      primaryColorSuppl: '#a36549',
    },
  }
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <!-- n-config-provider 會把預設字級設成 14px / 行高 1.6(Naive UI 自己的設計系統),
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
  </n-config-provider>
</template>
