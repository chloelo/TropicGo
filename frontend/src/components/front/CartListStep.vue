<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { api } from '@/api/client'
  import { useCartStore, type CartItem } from '@/stores/cart'
  import { useToastStore } from '@/stores/toast'
  import { formatCurrency } from '@/utils/format'

  // 驗證優惠碼的 API 不會回傳代碼本身,送出訂單時要用,所以把客人輸入的代碼一起記下來
  export interface AppliedCoupon {
    code: string
    title: string
    percent: number
  }

  // payable(折扣後應付金額)由 CartView 算好傳進來,後面填資料、確認付款的步驟也要用同一個數字
  const props = defineProps<{ payable: number }>()
  const coupon = defineModel<AppliedCoupon | null>('coupon', { required: true })
  const emit = defineEmits<{ next: [] }>()

  const cartStore = useCartStore()
  const toast = useToastStore()

  const discount = computed(() => cartStore.totalPrice - props.payable)

  // 結帳成功後也會呼叫 cartStore.clear(),那時不該跳「清除購物車」,所以通知只放在按鈕這裡
  function clearCart() {
    cartStore.clear()
    toast.push('成功清除購物車')
  }

  // 數量框可以直接輸入(舊版是 @change 才更新):打小數取整數,清空或小於 1 就不改,
  // 最後把框裡的字改回實際數量,避免畫面停在打錯的值
  function handleQuantityChange(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement
    const n = Math.floor(Number(input.value))
    if (Number.isFinite(n) && n >= 1) cartStore.updateQuantity(item.tourId, n)
    input.value = String(item.quantity)
  }

  // 舊版 findCoupon():套用後不管成功失敗都清空輸入框;失敗時保留原本已套用的優惠
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
  <!-- 舊版 .zone_cartList:左邊 8/12 欄購物清單、右邊 4/12 欄金額,768px 以下上下堆疊 -->
  <div class="flex flex-wrap justify-center -mx-[15px]">
    <div class="w-full md:w-2/3 px-[15px]">
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
          <!-- min-w-0:數量輸入框本身有預設寬度,不加的話手機版這欄縮不下來,會整個超出灰底卡片 -->
          <div class="relative w-full min-w-0 p-4">
            <!-- 舊版 Bootstrap .close:半透明灰色叉叉,hover 變比較不透明 -->
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

            <!-- 數量加減佔一半寬、小計靠右;768px 以下數量加減佔滿一整行,小計換到下一行 -->
            <div class="mt-2 flex flex-wrap items-center md:flex-nowrap">
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
              <p class="ml-auto">小計：{{ formatCurrency(item.price * item.quantity) }}</p>
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

    <div class="w-full md:w-1/3 px-[15px]">
      <div class="p-4 mb-4 border border-[#dee2e6]">
        <div class="flex justify-between">
          <span class="font-bold">商品總額</span>
          <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
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
        <div class="mt-4 flex justify-between">
          <span class="font-bold">折扣</span>
          <span class="text-[#dc3545]">- {{ formatCurrency(discount) }}</span>
        </div>
        <div class="mt-4 pt-4 flex justify-between border-t border-dashed border-[#dee2e6]">
          <p class="font-bold">應付金額</p>
          <p class="text-[24px] font-bold leading-[1.2] text-secondary">
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
