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
    class="group relative flex flex-col bg-white shadow-sm"
  >
    <div class="relative">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img
          :src="tour.images[0]?.url"
          :alt="tour.title"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-120 transition-transform duration-500 ease-[ease-in-out]"
        />
        <span
          v-if="tour.is_popular"
          class="absolute top-2 left-2 px-2 py-1 rounded-full bg-alert text-white text-xs flex items-center gap-1"
        >
          <span class="i-fa6-fire" />
          熱門
        </span>
      </div>
      <!-- 徽章往右凸出卡片一點點；圖片外框為了 hover 放大要 overflow-hidden，
           徽章放在裡面會被裁掉，所以放在外框外面定位 -->
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
    <!-- 內文區 flex-1 撐滿、按鈕放最後：同一排卡片的按鈕都會對齊在底部 -->
    <button
      type="button"
      class="w-full py-2 bg-secondary text-white flex items-center justify-center gap-2 hover:bg-secondary-dark transition-colors"
      @click.prevent.stop="addToCart"
    >
      <span class="i-fa6-cart-shopping" />
      我要報名
    </button>
  </RouterLink>
</template>
