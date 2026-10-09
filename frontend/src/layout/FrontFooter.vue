<script setup lang="ts">
  import logo from '@/assets/images/logo.png'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const year = new Date().getFullYear()

  // CakeResume 沒有品牌 icon,Font Awesome 免費版的履歷類 icon 又都不是方的,
  // 改用 Boxicons 的人像方塊(SVG 直接寫在 uno.config.ts),才跟方形的 GitHub/LinkedIn 一致;
  // title 讓滑鼠移上去看得到是什麼連結
  const socialLinks = [
    { label: '履歷(CakeResume)', href: 'https://www.cake.me/resumes/chloe-lo', icon: 'i-boxicons-user-square-filled' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lo-yihsin', icon: 'i-fa6-brands-linkedin' },
    { label: 'GitHub', href: 'https://github.com/chloelo/TropicGo', icon: 'i-fa6-brands-square-github' },
  ]
</script>

<template>
  <div>
    <!-- img 預設是 inline,會貼著文字基線,底下留一截行高造成的小縫隙——block 才會跟下面的色塊整個貼齊 -->
    <img :src="HERO_IMAGES.footerDecorative" alt="" loading="lazy" class="w-full block" />
  </div>
  <footer class="bg-africa text-white">
    <div class="bs-container py-[30px]">
      <!-- 舊版 logo/社群 icon 這排是單純 d-flex justify-content-between,沒有允許換行,
           手機寬度也是硬擠在同一排——我多加了 flex-wrap,窄螢幕擠不下就整個 icon 掉到下一行、跟 logo 沒對齊 -->
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/">
          <img :src="logo" alt="TropicGo" class="h-10 w-auto block" />
        </RouterLink>
        <ul class="flex gap-4 text-xl list-none">
          <li v-for="link in socialLinks" :key="link.label">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="hover:text-sunbright transition-colors"
              :aria-label="link.label"
              :title="link.label"
            >
              <span :class="link.icon" />
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-6 flex flex-col md:flex-row justify-between gap-2 text-white/80">
        <div>
          <p>03-456-7890</p>
          <p>tropicgo@mail.com</p>
        </div>
        <p>&copy; {{ year }} TropicGo All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>
