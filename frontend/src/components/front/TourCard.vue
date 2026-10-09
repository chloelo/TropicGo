<script setup lang="ts">
  import type { Tour } from '@/api/tropicgo-api'
  import { useCartStore } from '@/stores/cart'
  import { formatCurrency } from '@/utils/format'
  import { REGION_BG } from '@/utils/region'

  const props = defineProps<{ tour: Tour }>()

  const cartStore = useCartStore()

  function addToCart() {
    cartStore.addItem(props.tour, 1)
  }
</script>

<template>
  <RouterLink
    :to="`/products/${tour.id}`"
    class="group relative flex flex-col bg-white shadow-sm hover:shadow-lg transition-shadow"
  >
    <div class="relative">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img
          :src="tour.images[0]?.url"
          :alt="tour.title"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          v-if="tour.is_popular"
          class="absolute top-2 left-2 px-2 py-1 rounded-full bg-alert text-white text-xs flex items-center gap-1"
        >
          <span class="i-fa6-fire" />
          熱門
        </span>
      </div>
      <!-- 舊版 .badge 在圖片右下角、right:-5px 往右凸出卡片一點點。圖片外框為了 hover 放大
           要 overflow-hidden,徽章放在裡面會被裁掉,所以拉到外框外面定位 -->
      <span
        v-if="tour.region"
        class="absolute -right-[5px] bottom-[7px] z-10 px-2 py-1 rounded-full text-xs font-medium text-white"
        :class="REGION_BG[tour.region.slug] ?? 'bg-gray-400'"
      >
        {{ tour.region.name }}
      </span>
    </div>
    <div class="p-4 pb-2 bg-gray-100 flex-1">
      <h3 class="font-bold text-gray-800 line-clamp-1">{{ tour.title }}</h3>
      <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ tour.summary }}</p>
      <div class="mt-3 flex items-baseline justify-between">
        <span class="text-xs text-gray-400 line-through">
          {{ formatCurrency(tour.origin_price) }}/{{ tour.unit }}
        </span>
        <span class="text-lg font-bold text-primary">{{ formatCurrency(tour.price) }}/{{ tour.unit }}</span>
      </div>
    </div>
    <!-- 舊版 .btn-addTocart 釘在卡片最底部、寬度 100%,直接接在灰底內文下方、中間沒有空隙。
         內文區 flex-1 撐滿,按鈕當最後一個 flex 子元素,同一排卡片的按鈕也會對齊在底部 -->
    <button
      type="button"
      class="w-full py-2 bg-secondary text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      @click.prevent.stop="addToCart"
    >
      <span class="i-fa6-cart-shopping" />
      我要報名
    </button>
  </RouterLink>
</template>
