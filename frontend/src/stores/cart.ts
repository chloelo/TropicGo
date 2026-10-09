import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { Tour } from '@/api/tropicgo-api'
import { useToastStore } from '@/stores/toast'

export interface CartItem {
  tourId: string
  title: string
  price: number
  unit: string
  image: string
  quantity: number
}

const STORAGE_KEY = 'tropicgo_cart'
const PENDING_ORDER_KEY = 'tropicgo_pending_order'

export const useCartStore = defineStore('cart', () => {
  // 自動讀寫 localStorage(JSON 轉換、解析失敗退回預設值、深層變動同步都由 VueUse 處理)
  const items = useLocalStorage<CartItem[]>(STORAGE_KEY, [])
  // 已送出但還沒付款的訂單 id(空字串 = 沒有)。送出訂單後購物車就清空了,
  // 客人關掉分頁或逛到別頁,還能從 header 購物車彈窗的「前往付款」回到付款步驟
  const pendingOrderId = useLocalStorage(PENDING_ORDER_KEY, '')
  // 通知寫在 action 裡,不管從哪個頁面/元件呼叫都會跳 toast(舊版的訊息文字)
  const toast = useToastStore()

  function addItem(tour: Tour, quantity = 1) {
    const existing = items.value.find((item) => item.tourId === tour.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        tourId: tour.id,
        title: tour.title,
        price: tour.price,
        unit: tour.unit,
        image: tour.images[0]?.url ?? '',
        quantity,
      })
    }
    toast.push('商品成功加入購物車~')
  }

  function removeItem(tourId: string) {
    items.value = items.value.filter((item) => item.tourId !== tourId)
    toast.push('成功刪除購物車品項')
  }

  function updateQuantity(tourId: string, quantity: number) {
    const item = items.value.find((i) => i.tourId === tourId)
    const next = Math.max(1, quantity)
    if (!item || item.quantity === next) return
    item.quantity = next
    toast.push('成功更改商品數量囉')
  }

  function clear() {
    items.value = []
  }

  const totalQuantity = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  return {
    items,
    pendingOrderId,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalQuantity,
    totalPrice,
  }
})
