<script setup lang="ts">
  import { computed } from 'vue'
  import type { Order } from '@/api/tropicgo-api'

  const props = defineProps<{ order: Order; payment: string | null }>()

  // 付款方式後端訂單沒有存,用客人在填寫資料那一步選的
  const rows = computed(() => [
    { label: '聯絡人姓名', value: props.order.customer_name },
    { label: '聯絡人電話', value: props.order.customer_phone },
    { label: '聯絡人信箱', value: props.order.customer_email },
    { label: '聯絡人地址', value: props.order.customer_address },
    { label: '付款方式', value: props.payment ?? '' },
  ])
  const paid = computed(() => props.order.status === 'PAID' || props.order.status === 'COMPLETED')
</script>

<template>
  <!-- 舊版 .order-infos:淺灰綠底,每一行之間用虛線隔開。確認付款那一步會把按鈕放進 slot -->
  <div class="p-4 mb-12 bg-[#f4f7f6]">
    <h4
      class="mb-6 pb-2 text-center text-[24px] font-medium leading-[1.2] border-b border-[#dee2e6]"
    >
      聯絡人資料
    </h4>
    <div
      v-for="(row, index) in rows"
      :key="row.label"
      class="flex justify-between items-center py-[10px]"
      :class="index === 0 ? 'pt-0' : 'border-t border-dashed border-[#dee2e6]'"
    >
      <p class="mr-3">{{ row.label }}</p>
      <p class="font-bold">{{ row.value }}</p>
    </div>
    <div
      class="flex justify-between items-center pt-[10px] border-t border-dashed border-[#dee2e6]"
    >
      <p class="mr-3">付款狀態</p>
      <p class="font-bold" :class="paid ? 'text-secondary' : 'text-[#dc3545]'">
        {{ paid ? '已付款' : '尚未付款' }}
      </p>
    </div>
    <slot />
  </div>
</template>
