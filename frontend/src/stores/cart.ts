import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { Tour, TourDepartureOption } from '@/api/tropicgo-api'
import { useToastStore } from '@/stores/toast'

/** 購物車品項：加入時把產品和梯次資料存一份，購物車頁不用再向 API 撈。用梯次區分品項 */
export interface CartItem {
  departureId: string
  /** 出發日期 YYYY-MM-DD */
  departureDate: string
  tourId: string
  title: string
  price: number
  unit: string
  image: string
  quantity: number
}

/** 每個梯次一次最多報名的人數，跟後端訂單驗證一致 */
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

  // 加入梯次功能前存的品項沒有梯次，無法下單，清掉並提醒重新選擇出發日期
  if (items.value.some((item) => !item.departureId)) {
    items.value = items.value.filter((item) => item.departureId)
    toast.push('購物車裡的行程需要重新選擇出發日期', 'danger')
  }

  /**
   * 加入購物車；同一個梯次已經在購物車裡就加總人數。
   * 最多 MAX_QUANTITY 人，也不超過加入當下的剩餘名額（實際名額送出訂單時由後端確認）
   */
  function addItem(tour: Tour, departure: TourDepartureOption, quantity = 1) {
    const limit = Math.min(MAX_QUANTITY, departure.remaining_seats)
    const existing = items.value.find((item) => item.departureId === departure.id)
    if (existing) {
      const total = existing.quantity + quantity
      existing.quantity = Math.min(total, limit)
      if (total > limit) {
        toast.push(`這個梯次最多報名 ${limit} 人，購物車已調整為 ${limit} 人`, 'danger')
        return
      }
    } else {
      items.value.push({
        departureId: departure.id,
        departureDate: departure.departure_date,
        tourId: tour.id,
        title: tour.title,
        price: tour.price,
        unit: tour.unit,
        image: tour.images[0]?.url ?? '',
        quantity: Math.min(quantity, limit),
      })
    }
    toast.push('商品成功加入購物車~')
  }

  function removeItem(departureId: string) {
    items.value = items.value.filter((item) => item.departureId !== departureId)
    toast.push('成功刪除購物車品項')
  }

  /** 更新人數，限制在 1 到 MAX_QUANTITY 之間；數量沒變就不更新、不跳提示 */
  function updateQuantity(departureId: string, quantity: number) {
    const item = items.value.find((i) => i.departureId === departureId)
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
