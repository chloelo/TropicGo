<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import type { Tour } from '@/api/tropicgo-api'
  import { formatCurrency } from '@/utils/format'
  import { REGION_BG } from '@/utils/region'

  const props = defineProps<{ tour: Tour }>()

  const router = useRouter()

  // 報名要先選出發日期，卡片上沒有地方選：點卡片停在產品頁最上方看介紹，
  // 點「我要報名」則帶到產品頁的報名區（#booking），直接選日期
  function goToBooking() {
    router.push({ path: `/products/${props.tour.id}`, hash: '#booking' })
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
      <h3 class="font-bold text-[#495057] leading-[1.5] min-h-[3em] line-clamp-2">
        {{ tour.title }}
      </h3>
      <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ tour.summary }}</p>
      <div class="mt-3 flex items-baseline justify-between">
        <span class="text-xs text-gray-400 line-through">
          {{ formatCurrency(tour.origin_price) }}/{{ tour.unit }}
        </span>
        <span class="text-lg font-bold text-secondary">
          {{ formatCurrency(tour.price) }}/{{ tour.unit }}
        </span>
      </div>
    </div>
    <!-- 內文區 flex-1 撐滿、按鈕放最後：同一排卡片的按鈕都會對齊在底部。
         卡片本身是連結，裡面不能放 button，改用 div -->
    <div
      class="w-full py-2 bg-secondary text-white flex items-center justify-center gap-2 hover:bg-secondary-dark transition-colors"
      @click.prevent.stop="goToBooking"
    >
      <span class="i-fa6-cart-shopping" />
      我要報名
    </div>
  </RouterLink>
</template>
