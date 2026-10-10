import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { Tour } from '@/api/tropicgo-api'
import { useToastStore } from '@/stores/toast'

/** 購物車品項：加入時把產品資料存一份，購物車頁不用再向 API 撈 */
export interface CartItem {
  tourId: string
  title: string
  price: number
  unit: string
  image: string
  quantity: number
}

/** 每個產品一次最多報名的人數，跟後端訂單驗證一致 */
export const MAX_QUANTITY = 20

const STORAGE_KEY = 'tropicgo_cart'
const PENDING_ORDER_KEY = 'tropicgo_pending_order'

/** 購物車，存在 localStorage */
export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<CartItem[]>(STORAGE_KEY, [])
  /**
   * 已送出但還沒付款的訂單 id（空字串表示沒有）。送出訂單後購物車就清空了，
   * 客人關掉分頁或逛到別頁，還能從 header 購物車彈窗的「前往付款」回到付款步驟
   */
  const pendingOrderId = useLocalStorage(PENDING_ORDER_KEY, '')
  // 通知寫在 action 裡，不管從哪裡呼叫都會跳出提示
  const toast = useToastStore()

  /** 加入購物車；同一個產品已經在購物車裡就加總人數，最多 MAX_QUANTITY 人 */
  function addItem(tour: Tour, quantity = 1) {
    const existing = items.value.find((item) => item.tourId === tour.id)
    if (existing) {
      const total = existing.quantity + quantity
      existing.quantity = Math.min(total, MAX_QUANTITY)
      if (total > MAX_QUANTITY) {
        toast.push(
          `每個產品最多報名 ${MAX_QUANTITY} 人，購物車已調整為 ${MAX_QUANTITY} 人`,
          'danger',
        )
        return
      }
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

  /** 更新人數，限制在 1 到 MAX_QUANTITY 之間；數量沒變就不更新、不跳提示 */
  function updateQuantity(tourId: string, quantity: number) {
    const item = items.value.find((i) => i.tourId === tourId)
    const next = Math.min(Math.max(1, quantity), MAX_QUANTITY)
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
