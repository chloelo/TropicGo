<script setup lang="ts">
  import HeroBanner from '@/components/front/HeroBanner.vue'
  import { HERO_IMAGES } from '@/utils/hero-images'

  // 也給詳情頁「找不到這個行程」共用，只換標題和說明文字
  withDefaults(defineProps<{ heading?: string; message?: string }>(), {
    heading: '找不到這個頁面',
    message: '網址可能打錯了，或是這個頁面已經不存在。',
  })
</script>

<template>
  <!-- header 在桌機未捲動時是透明的，頁面頂端一定要有 Hero，不然 header 的白字會看不見 -->
  <main>
    <HeroBanner
      title="迷路了嗎？"
      :bg-desktop="HERO_IMAGES.products.desktop"
      :bg-mobile="HERO_IMAGES.products.mobile"
      desktop-position="50% 65%"
      mobile-position="50% 50%"
      title-bottom="15%"
    />
    <section class="bs-container py-[60px] text-center">
      <h2 class="text-[28px] font-medium leading-[1.2] mb-4">{{ heading }}</h2>
      <p class="mb-8">{{ message }}</p>
      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <RouterLink
          to="/"
          class="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
        >
          回到首頁
        </RouterLink>
        <RouterLink
          to="/products"
          class="px-6 py-2 bg-secondary text-white flex items-center justify-center gap-2 hover:bg-secondary-dark transition-colors"
        >
          去找行程
          <span class="i-fa6-chevron-right text-sm" />
        </RouterLink>
      </div>
    </section>
  </main>
</template>
