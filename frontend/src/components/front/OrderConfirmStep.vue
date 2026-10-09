<script setup lang="ts">
  import { computed } from 'vue'
  import type { Order } from '@/api/tropicgo-api'
  import OrderContactInfo from '@/components/front/OrderContactInfo.vue'
  import type { CartItem } from '@/stores/cart'
  import { formatCurrency } from '@/utils/format'

  // orderedItems:送出訂單前購物車的內容(送出後購物車就清空了),
  // 訂單明細沒有圖片和單位,從這裡用行程名稱對回來
  const props = defineProps<{
    order: Order
    orderedItems: CartItem[]
    paying: boolean
  }>()
  const emit = defineEmits<{ pay: [] }>()

  const items = computed(() =>
    props.order.items.map((item) => {
      const cartItem = props.orderedItems.find((c) => c.title === item.title_snapshot)
      return { ...item, image: cartItem?.image, unit: cartItem?.unit ?? '' }
    }),
  )
  const originalAmount = computed(() =>
    props.order.items.reduce((sum, item) => sum + item.subtotal, 0),
  )
  const discount = computed(() => originalAmount.value - props.order.total_amount)
</script>

<template>
  <!-- 舊版 .zone_order:置中 8/12 欄,上面訂單明細、下面聯絡人資料和確認付款按鈕 -->
  <div class="flex justify-center -mx-[15px]">
    <div class="w-full md:w-2/3 px-[15px]">
      <div class="p-4 mb-12 border border-[#dee2e6]">
        <h4
          class="mb-6 pb-2 text-center text-[24px] font-medium leading-[1.2] border-b border-[#dee2e6]"
        >
          訂單明細
        </h4>
        <!-- 舊版沒有訂單編號,新版補上,客人之後要查詢訂單時用得到 -->
        <div class="flex justify-between mb-4">
          <p class="font-bold">訂單編號</p>
          <p>{{ order.order_number }}</p>
        </div>
        <div v-for="item in items" :key="item.id" class="flex mb-4">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title_snapshot"
            class="w-12 h-12 object-cover shrink-0 mr-2"
          />
          <div class="w-full">
            <div class="flex justify-between">
              <p class="mr-2 font-bold">{{ item.title_snapshot }}</p>
              <p class="text-right whitespace-nowrap">{{ formatCurrency(item.subtotal) }}</p>
            </div>
            <p class="font-bold">{{ item.quantity }} {{ item.unit }}</p>
          </div>
        </div>

        <template v-if="discount > 0">
          <div class="mt-4 flex justify-between">
            <p class="font-bold">商品原價</p>
            <p>{{ formatCurrency(originalAmount) }}</p>
          </div>
          <div class="mt-2 flex justify-between">
            <p class="font-bold">折扣金額</p>
            <p class="text-[#dc3545]">- {{ formatCurrency(discount) }}</p>
          </div>
        </template>

        <div
          class="mt-4 pt-4 flex justify-between items-center border-t border-dashed border-[#dee2e6]"
        >
          <p class="font-bold">訂單金額</p>
          <p class="text-[24px] font-bold leading-[1.2] text-secondary">
            {{ formatCurrency(order.total_amount) }}
          </p>
        </div>
      </div>

      <OrderContactInfo :order="order">
        <button
          type="button"
          class="mt-4 w-full px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors disabled:opacity-65 disabled:pointer-events-none"
          :disabled="paying"
          @click="emit('pay')"
        >
          確認付款
        </button>
      </OrderContactInfo>
    </div>
  </div>
</template>
