<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
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
    // 舊版 header 寫的是「產品列表」(首頁 Hero 的按鈕才是「找行程」)
    { label: '產品列表', to: '/products' },
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

  // 舊版愛心、購物車 icon 跟選單文字共用 .nav-link 的顏色:白底時灰色、hover 黃橘、所在頁赤陶色;
  // 桌機透明底時白色、hover 白 80%、所在頁亮黃。lg 以下 header 一直是白底,所以沒捲動時也要先給白底的顏色,
  // 桌機(lg)再蓋成透明底的顏色
  function iconClass(active: boolean) {
    if (active) return scrolled.value ? 'text-africa' : 'text-africa lg:text-sunbright'
    return scrolled.value
      ? 'text-gray-700 hover:text-sun'
      : 'text-gray-700 hover:text-sun lg:text-white lg:hover:text-white/80'
  }

  // 購物車彈窗打開時,白底的 icon 維持黃橘色(舊版 .nav-link[aria-expanded="true"])
  function cartIconClass() {
    if (!cartOpen.value) return iconClass(false)
    return scrolled.value ? 'text-sun' : 'text-sun lg:text-white lg:hover:text-white/80'
  }

  // 購物車彈窗改成自己控制開關:點「查看購物車/前去逛逛」換頁時要順便收起來,
  // 不然 header 不會重新渲染,彈窗會一直開著蓋在新頁面上
  const cartOpen = ref(false)

  // 換頁時把手機選單和購物車彈窗都收起來(舊版 NavbarFront.vue 也是 watch $route 收合選單),
  // 不管是點選單連結、logo、收藏愛心還是瀏覽器上一頁,都不會留著蓋在新頁面上
  watch(
    () => route.fullPath,
    () => {
      mobileOpen.value = false
      cartOpen.value = false
    },
  )

  function goToCart() {
    cartOpen.value = false
    router.push(cartStore.items.length ? '/cart' : '/products')
  }

  // 有送出但還沒付款的訂單:帶訂單 id 回購物車頁,會直接顯示確認付款那一步
  function goToPayment() {
    cartOpen.value = false
    router.push({ path: '/cart', query: { order: cartStore.pendingOrderId } })
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
          :class="iconClass(route.path === '/favorite')"
          aria-label="我的收藏"
          title="我的收藏"
        >
          <span class="i-fa6-heart" />
        </RouterLink>

        <!-- :to="false" 讓彈出視窗直接放在 header 裡,跟著 fixed 的 header 一起固定;
             預設放到 body 底下時,捲動頁面每次都要重算位置追上 header,會慢半拍看起來在晃 -->
        <n-popover v-model:show="cartOpen" trigger="click" placement="bottom-end" :width="280" :to="false">
          <template #trigger>
            <button
              type="button"
              aria-label="購物車"
              class="relative text-lg transition-colors"
              :class="cartIconClass()"
              :aria-expanded="cartOpen"
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
            <div
              v-if="cartStore.pendingOrderId"
              class="flex items-center justify-between gap-2 mb-3 p-2 bg-[#f8f9fa] text-sm"
            >
              <span class="text-gray-700">您有一筆訂單尚未付款</span>
              <button
                type="button"
                class="flex items-center gap-1 shrink-0 text-primary hover:text-africa-link transition-colors"
                @click="goToPayment"
              >
                前往付款
                <span class="i-fa6-chevron-right text-xs" />
              </button>
            </div>

            <p class="font-bold text-sm text-gray-700 mb-2">已選擇行程</p>

            <!-- 品項多時只有清單這段捲動(標題列黏在上面),總計和按鈕固定在下方不用滑到底 -->
            <!-- table-fixed:數量/單價固定寬度、品名吃剩下的空間,表格寬度永遠等於容器,
                 不會被長品名或直向卷軸擠出橫向卷軸(一般表格的格子不遵守 max-width,會被內容撐寬) -->
            <div v-if="cartStore.items.length" class="max-h-[300px] overflow-y-auto">
              <table class="w-full table-fixed text-sm">
                <thead class="sticky top-0 bg-white">
                  <tr class="text-gray-400 text-xs border-b border-gray-100">
                    <th class="text-left font-normal pb-1">品名</th>
                    <th class="w-10 text-center font-normal pb-1">數量</th>
                    <th class="w-[90px] text-right font-normal pb-1">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item.tourId">
                    <!-- 被截斷時滑鼠移上去會跳出完整品名,沒截斷就不會跳 -->
                    <td class="py-1 pr-2"><n-ellipsis>{{ item.title }}</n-ellipsis></td>
                    <td class="text-center py-1">{{ item.quantity }}</td>
                    <td class="text-right py-1 whitespace-nowrap">{{ formatCurrency(item.price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="text-gray-400 text-sm py-2">您尚未選擇任何行程喔！</p>

            <div
              v-if="cartStore.items.length"
              class="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-gray-100"
            >
              <span>總計</span>
              <span class="text-primary">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>

            <button
              class="w-full mt-3 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 hover:bg-primary-dark transition-colors"
              @click="goToCart"
            >
              {{ cartStore.items.length ? '查看購物車' : '前去逛逛' }}
              <span class="i-fa6-chevron-right text-xs" />
            </button>
          </div>
        </n-popover>

        <!-- 跟旁邊的愛心、購物車一樣:hover 變黃橘,選單展開時維持黃橘(只在 lg 以下出現,header 一定是白底) -->
        <button
          type="button"
          class="lg:hidden text-lg transition-colors"
          :class="mobileOpen ? 'text-sun' : 'text-gray-700 hover:text-sun'"
          aria-label="選單"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
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
