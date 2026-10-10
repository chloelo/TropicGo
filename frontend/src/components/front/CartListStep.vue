<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { api } from '@/api/client'
  import { useCartStore, type CartItem } from '@/stores/cart'
  import { useToastStore } from '@/stores/toast'
  import { formatCurrency } from '@/utils/format'

  /** 套用中的優惠券。驗證優惠碼的 API 不會回傳代碼本身，送出訂單時要用，所以把客人輸入的代碼一起存下來 */
  export interface AppliedCoupon {
    code: string
    title: string
    percent: number
  }

  // 折扣後的應付金額由 CartView 計算後傳入，後面的步驟也用同一個數字
  const props = defineProps<{ payable: number }>()
  const coupon = defineModel<AppliedCoupon | null>('coupon', { required: true })
  const emit = defineEmits<{ next: [] }>()

  const cartStore = useCartStore()
  const toast = useToastStore()

  const discount = computed(() => cartStore.totalPrice - props.payable)

  // 結帳成功時也會清空購物車，那時不該跳「成功清除購物車」，所以通知只放在這個按鈕
  function clearCart() {
    cartStore.clear()
    toast.push('成功清除購物車')
  }

  // 數量框可以直接輸入：小數取整數，清空或小於 1 就不更新，最後把框裡的文字改回實際數量
  function handleQuantityChange(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement
    const n = Math.floor(Number(input.value))
    if (Number.isFinite(n) && n >= 1) cartStore.updateQuantity(item.tourId, n)
    input.value = String(item.quantity)
  }

  // 套用後不論成功失敗都清空輸入框（原設計）；失敗時保留原本已套用的優惠
  const couponCode = ref('')

  async function applyCoupon() {
    const code = couponCode.value.trim()
    couponCode.value = ''
    if (!code) {
      toast.push('折扣碼無效喔', 'danger')
      return
    }
    try {
      const { data } = await api.coupons.checkCoupon({ code })
      coupon.value = { code, title: data.data.title, percent: data.data.percent }
      toast.push('優惠碼正確，已幫您折扣囉')
    } catch {
      toast.push('折扣碼無效喔', 'danger')
    }
  }
</script>

<template>
  <!-- 寬螢幕左右兩欄（清單 8/12、金額 4/12），以下上下堆疊：
       金額顯示為「NT$ 378,000」，平板寬度的 4/12 欄放不下，小計和應付金額會折行 -->
  <div class="flex flex-wrap justify-center -mx-[15px]">
    <div class="w-full lg:w-2/3 px-[15px]">
      <template v-if="cartStore.items.length">
        <div class="flex justify-between items-center mb-4">
          <RouterLink
            to="/products"
            class="text-secondary hover:text-secondary-link transition-colors"
          >
            <span class="i-fa6-chevron-left" />
            繼續購物
          </RouterLink>
          <button
            type="button"
            class="px-3 py-[6px] text-[14px] text-[#adb5bd] hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            @click="clearCart"
          >
            <span class="i-fa6-trash-can" />
            清空購物車
          </button>
        </div>

        <div
          v-for="item in cartStore.items"
          :key="item.tourId"
          class="flex items-center bg-[#f8f9fa] mb-6"
        >
          <div class="pl-4">
            <img :src="item.image" :alt="item.title" class="w-[120px] h-auto align-middle" />
          </div>
          <!-- min-w-0：數量輸入框有預設寬度，不加的話手機版這欄縮不下來，會超出卡片 -->
          <div class="relative w-full min-w-0 p-4">
            <button
              type="button"
              class="absolute top-4 right-4 text-[20px] leading-none text-[#adb5bd] opacity-50 hover:opacity-75"
              aria-label="刪除品項"
              @click="cartStore.removeItem(item.tourId)"
            >
              <span class="i-fa6-xmark" />
            </button>
            <p class="font-bold pr-6 text-africa">{{ item.title }}</p>
            <p class="mb-1 text-[14px] text-[#6c757d]">
              {{ formatCurrency(item.price) }} / {{ item.unit }}
            </p>

            <!-- 數量加減佔一半寬、小計靠右；手機版數量加減佔滿一行，小計換到下一行 -->
            <div class="mt-2 flex flex-wrap items-center gap-x-3 md:flex-nowrap">
              <div class="flex w-full h-[38px] mb-[10px] md:w-1/2 md:mb-0">
                <button
                  type="button"
                  class="px-3 border border-r-0 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors disabled:opacity-65 disabled:pointer-events-none"
                  :disabled="item.quantity <= 1"
                  aria-label="減少人數"
                  @click="cartStore.updateQuantity(item.tourId, item.quantity - 1)"
                >
                  <span class="i-fa6-minus" />
                </button>
                <input
                  :value="item.quantity"
                  type="number"
                  min="1"
                  class="flex-1 min-w-0 pl-4 pr-3 border-y border-secondary text-secondary text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="人數"
                  @change="handleQuantityChange(item, $event)"
                />
                <button
                  type="button"
                  class="px-3 border border-l-0 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label="增加人數"
                  @click="cartStore.updateQuantity(item.tourId, item.quantity + 1)"
                >
                  <span class="i-fa6-plus" />
                </button>
              </div>
              <p class="ml-auto whitespace-nowrap">
                小計：{{ formatCurrency(item.price * item.quantity) }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="border-b border-[#dee2e6] my-2 py-2">
          <RouterLink
            to="/products"
            class="text-secondary hover:text-secondary-link transition-colors"
          >
            <span class="i-fa6-chevron-left" />
            繼續購物
          </RouterLink>
        </div>
        <p class="text-center mt-4 mb-8">您尚未選擇任何行程喔，快去選購吧！</p>
      </template>
    </div>

    <div class="w-full lg:w-1/3 px-[15px]">
      <div class="p-4 mb-4 border border-[#dee2e6]">
        <div class="flex justify-between gap-3">
          <span class="font-bold">商品總額</span>
          <span class="whitespace-nowrap">{{ formatCurrency(cartStore.totalPrice) }}</span>
        </div>
        <form class="mt-4 flex" @submit.prevent="applyCoupon">
          <input
            v-model="couponCode"
            type="text"
            class="flex-1 min-w-0 px-2 py-1 text-[14px] border border-secondary text-[#495057] outline-none placeholder:text-[#adb5bd]"
            placeholder="請輸入折扣碼"
            aria-label="請輸入折扣碼"
          />
          <button
            type="submit"
            class="-ml-px px-2 py-1 text-[14px] border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            套用
          </button>
        </form>
        <div class="mt-4 flex justify-between gap-3">
          <span class="font-bold">折扣</span>
          <span class="whitespace-nowrap text-[#dc3545]">- {{ formatCurrency(discount) }}</span>
        </div>
        <div class="mt-4 pt-4 flex justify-between gap-3 border-t border-dashed border-[#dee2e6]">
          <p class="font-bold whitespace-nowrap">應付金額</p>
          <p class="whitespace-nowrap text-[24px] font-bold leading-[1.2] text-secondary">
            {{ formatCurrency(payable) }}
          </p>
        </div>
        <button
          type="button"
          class="mt-4 w-full px-3 py-[6px] border border-secondary bg-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark transition-colors disabled:opacity-65 disabled:pointer-events-none"
          :disabled="!cartStore.items.length"
          @click="emit('next')"
        >
          前往結帳
          <span class="i-fa6-chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>
