import type { OrderInput } from '@/api/tropicgo-api'

/** 付款方式代碼。型別由 openapi.yaml 的 enum 產生；資料庫存代碼，畫面顯示中文 */
export type PaymentMethod = OrderInput['payment_method']

/** 代碼對應的中文名稱，順序就是結帳頁下拉選單的順序 */
export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  Credit: '信用卡',
  LinePay: 'LINE Pay',
  ApplePay: 'Apple Pay',
  GooglePay: 'Google Pay',
  ATM: 'ATM 轉帳',
  CVS: '超商代碼繳費',
}

function isPaymentMethod(value: string): value is PaymentMethod {
  return value in PAYMENT_LABEL
}

/** 訂單上存的代碼轉成中文；不在目前選項裡的（選項調整前的舊訂單）直接顯示原本的代碼 */
export function paymentLabel(value: string | null): string {
  if (!value) return '-'
  return isPaymentMethod(value) ? PAYMENT_LABEL[value] : value
}
