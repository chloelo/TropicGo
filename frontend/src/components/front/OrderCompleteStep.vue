<script setup lang="ts">
  import { ref } from 'vue'
  import type { Order } from '@/api/tropicgo-api'
  import OrderContactInfo from '@/components/front/OrderContactInfo.vue'

  defineProps<{ order: Order; payment: string | null }>()

  // 舊版用 Bootstrap collapse:按「查看訂單」展開/收合聯絡人資料
  const showOrder = ref(false)
</script>

<template>
  <!-- 舊版 .zone_checkout:置中 8/12 欄 -->
  <div class="flex justify-center -mx-[15px]">
    <div class="w-full md:w-2/3 px-[15px] mt-12">
      <div class="text-center">
        <h3 class="mb-2 text-[28px] font-medium leading-[1.2]">恭喜您，已完成付款！</h3>
        <p class="mb-4">感謝您對 TropicGo 的信任，我們會盡快與您聯絡，請耐心等候。</p>
        <div class="flex justify-around mt-6 mb-12">
          <button
            type="button"
            class="px-3 py-[6px] border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
            :aria-expanded="showOrder"
            @click="showOrder = !showOrder"
          >
            查看訂單
          </button>
          <RouterLink
            to="/products"
            class="inline-flex items-center gap-1 px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors"
          >
            再去逛逛
            <span class="i-fa6-chevron-right" />
          </RouterLink>
        </div>
      </div>
      <n-collapse-transition :show="showOrder">
        <OrderContactInfo :order="order" :payment="payment" />
      </n-collapse-transition>
    </div>
  </div>
</template>
