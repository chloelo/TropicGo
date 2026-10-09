<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{ step: number }>()

  // 舊版 Cart.vue 的四個步驟(Font Awesome 5 的 luggage-cart、list-alt、money-check-alt 在 FA6 改名了)
  const steps = [
    { label: '確認清單', icon: 'i-fa6-cart-flatbed-suitcase' },
    { label: '填寫資料', icon: 'i-fa6-rectangle-list' },
    { label: '確認付款', icon: 'i-fa6-money-check-dollar' },
    { label: '完成訂單', icon: 'i-fa6-address-card' },
  ]

  // 進度線從第一個圓的中心畫到最後一個圓的中心,每前進一步多 1/3
  const progressWidth = computed(() => `${((props.step - 1) / (steps.length - 1)) * 100}%`)
</script>

<template>
  <!-- 舊版 _cart.scss 的 .zone_process:圓形步驟疊在進度線上;
       relative 讓圓形畫在後面那條進度線(-mt 往上拉進來)的上層 -->
  <div class="flex justify-center -mx-[15px]">
    <div class="w-full md:w-10/12 px-[15px]">
      <ol class="relative flex justify-between">
        <li
          v-for="(item, index) in steps"
          :key="item.label"
          class="flex flex-col items-center justify-center w-[4.2rem] h-[4.2rem] rounded-[5%] text-[15px] transition-all duration-500 delay-400 ease-[ease] md:w-[5.5rem] md:h-[5.5rem] md:rounded-full"
          :class="index < step ? 'bg-secondary text-white' : 'bg-[#e9ecef] text-[#adb5bd]'"
          :aria-current="index === step - 1 ? 'step' : undefined"
        >
          <span class="text-[1.4rem]"><span :class="item.icon" /></span>
          <span class="border-t border-current">{{ item.label }}</span>
        </li>
      </ol>
      <div class="h-[5px] -mt-[40px] mx-[44px] bg-[#e9ecef] rounded-[0.25rem] overflow-hidden">
        <div
          class="h-full bg-secondary transition-[width] duration-600 ease-[ease]"
          :style="{ width: progressWidth }"
        />
      </div>
    </div>
  </div>
</template>
