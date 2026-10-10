<script setup lang="ts">
  import logo from '@/assets/images/logo.png'
  import { HERO_IMAGES } from '@/utils/hero-images'

  const year = new Date().getFullYear()

  // CakeResume 沒有品牌 icon，改用 Boxicons 的人像方塊（SVG 定義在 uno.config.ts），
  // 才會跟方形的 GitHub、LinkedIn icon 一致
  const socialLinks = [
    { label: '履歷（CakeResume）', href: 'https://www.cake.me/resumes/chloe-lo', icon: 'i-boxicons-user-square-filled' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lo-yihsin', icon: 'i-fa6-brands-linkedin' },
    { label: 'GitHub', href: 'https://github.com/chloelo/TropicGo', icon: 'i-fa6-brands-square-github' },
  ]
</script>

<template>
  <div>
    <!-- block：img 預設是 inline，底下會多出一截行高的縫隙，跟下面的色塊接不起來 -->
    <img :src="HERO_IMAGES.footerDecorative" alt="" loading="lazy" class="w-full block" />
  </div>
  <footer class="bg-africa text-white">
    <div class="bs-container py-[30px]">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/">
          <img :src="logo" alt="TropicGo" class="w-[130px] md:w-[195px] h-auto block" />
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

      <div class="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-1 text-white/80">
        <div>
          <p>03-456-7890</p>
          <p>tropicgo@mail.com</p>
        </div>
        <p>&copy; {{ year }} TropicGo All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>
