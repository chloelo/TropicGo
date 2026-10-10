<script setup lang="ts">
  import type { Tour } from '@/api/tropicgo-api'
  import { formatCurrency } from '@/utils/format'

  defineProps<{ tour: Tour }>()
</script>

<template>
  <!-- 只有「前往查看」的簡易卡片（詳情頁「猜您可能會喜歡」、收藏頁「熱門推薦」共用），跟產品列表的 TourCard 不同。
       每張卡片下方固定留 24px（最後一排也有），所以用 mb-6，不用 grid 的 gap-y -->
  <div class="flex flex-col bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.075)] mb-6">
    <div class="h-[185px] overflow-hidden">
      <img :src="tour.images[0]?.url" :alt="tour.title" loading="lazy" class="w-full h-full object-cover" />
    </div>
    <div class="p-5 flex-1 flex flex-col">
      <h5 class="text-[20px] font-medium leading-[1.2] mb-3">{{ tour.title }}</h5>
      <p class="leading-6 line-clamp-2 mb-4">{{ tour.content }}</p>
      <p class="flex justify-between items-center">
        <span class="text-[0.6rem] text-[#ccc] line-through">
          {{ formatCurrency(tour.origin_price) }}/{{ tour.unit }}
        </span>
        <span class="text-[1.2rem] text-secondary">{{ formatCurrency(tour.price) }}/{{ tour.unit }}</span>
      </p>
      <RouterLink
        :to="`/products/${tour.id}`"
        class="mt-4 w-full px-3 py-[6px] border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors flex items-center justify-center gap-1"
      >
        前往查看
        <span class="i-fa6-chevron-right text-sm" />
      </RouterLink>
    </div>
  </div>
</template>
