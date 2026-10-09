<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useWindowScroll } from '@vueuse/core'
  import logo from '@/assets/images/logo.png'
  import { useCartStore } from '@/stores/cart'
  import { formatCurrency } from '@/utils/format'

  const route = useRoute()
  const router = useRouter()
  const cartStore = useCartStore()
  const mobileOpen = ref(false)
  // 舊版 NavbarFront.vue:滾動超過 10px 才加上 .shadows(白底+陰影),沒滾動時是透明的疊在 Hero 圖上
  const { y } = useWindowScroll()
  const scrolled = computed(() => y.value >= 10)

  const navLinks = [
    { label: '首頁', to: '/' },
    { label: '找行程', to: '/products' },
    { label: '關於我們', to: '/about' },
  ]

  // RouterLink 的 active-class 是「加」在既有 class 後面,不是取代,active 時顏色 class 跟
  // 原本 :class 綁的顏色 class 同層級競爭,勝出的是看 UnoCSS 產生順序而不是誰該贏,只能用 !important
  // 硬壓。改成自己判斷 active、顏色整個收在同一個函式回傳單一 class 字串,同一時間只會有一個
  // 顏色 class 生效,沒有競爭,也就不需要 !important
  function desktopLinkClass(to: string) {
    if (route.path === to) {
      return scrolled.value ? 'text-africa font-medium' : 'text-sunbright font-medium'
    }
    return scrolled.value ? 'text-gray-700 hover:text-sun' : 'text-white hover:text-white/80'
  }

  function mobileLinkClass(to: string) {
    return route.path === to ? 'text-africa font-medium' : 'text-gray-700 hover:text-sun'
  }

  function goToCart() {
    router.push(cartStore.items.length ? '/cart' : '/products')
  }
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-colors"
    :class="
      scrolled
        ? 'bg-white shadow-[0_4px_8px_0_rgba(36,36,36,0.2)]'
        : 'bg-white shadow-[0_4px_8px_0_rgba(36,36,36,0.2)] lg:bg-transparent lg:shadow-none'
    "
  >
    <div class="px-4 h-16 flex items-center">
      <RouterLink to="/" class="shrink-0">
        <img :src="logo" alt="TropicGo" class="h-7 sm:h-9 w-auto" />
      </RouterLink>

      <!-- 舊版 navbar-nav 是 ml-auto,跟後面的 icon 群組貼在一起靠右,不是跟 logo 平均分散置中 -->
      <nav class="hidden lg:flex items-center gap-6 ml-auto mr-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-lg transition-colors"
          :class="desktopLinkClass(link.to)"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto lg:ml-0">
        <RouterLink
          to="/favorite"
          class="text-lg transition-colors"
          :class="
            scrolled
              ? 'text-gray-500 hover:text-alert'
              : 'text-gray-500 hover:text-alert lg:text-white lg:hover:text-white/80'
          "
          active-class="text-alert"
        >
          <span class="i-fa6-heart" />
        </RouterLink>

        <n-popover trigger="click" placement="bottom-end" :width="280">
          <template #trigger>
            <button
              class="relative text-lg transition-colors"
              :class="
                scrolled
                  ? 'text-gray-500 hover:text-primary'
                  : 'text-gray-500 hover:text-primary lg:text-white lg:hover:text-white/80'
              "
            >
              <span class="i-fa6-cart-shopping" />
              <span
                v-if="cartStore.totalQuantity > 0"
                class="absolute -top-2 -right-2 bg-alert text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center"
              >
                {{ cartStore.totalQuantity }}
              </span>
            </button>
          </template>

          <div>
            <p class="font-bold text-sm text-gray-700 mb-2">已選擇行程</p>

            <table v-if="cartStore.items.length" class="w-full text-sm">
              <thead>
                <tr class="text-gray-400 text-xs border-b border-gray-100">
                  <th class="text-left font-normal pb-1">品名</th>
                  <th class="text-center font-normal pb-1">數量</th>
                  <th class="text-right font-normal pb-1">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartStore.items" :key="item.tourId">
                  <td class="py-1 pr-2 max-w-[120px] truncate">{{ item.title }}</td>
                  <td class="text-center py-1">{{ item.quantity }}</td>
                  <td class="text-right py-1">{{ formatCurrency(item.price) }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else class="text-gray-400 text-sm py-2">您尚未選擇任何行程喔！</p>

            <div
              v-if="cartStore.items.length"
              class="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-gray-100"
            >
              <span>總計</span>
              <span class="text-primary">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>

            <button
              class="w-full mt-3 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 hover:opacity-90 transition-opacity"
              @click="goToCart"
            >
              {{ cartStore.items.length ? '查看購物車' : '前去逛逛' }}
              <span class="i-fa6-chevron-right text-xs" />
            </button>
          </div>
        </n-popover>

        <button class="lg:hidden text-lg text-gray-600" @click="mobileOpen = !mobileOpen">
          <span class="i-fa6-bars" />
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="lg:hidden bg-white px-4 flex flex-col">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="py-2.5 text-lg border-t border-dotted border-gray-400 transition-colors"
        :class="mobileLinkClass(link.to)"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </header>
</template>
