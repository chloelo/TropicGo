import { isAxiosError } from 'axios'

// 這兩種錯誤的原因跟使用者填的內容無關，直接顯示後端的說明比較清楚
const SHOW_SERVER_MESSAGE = [403, 429]

/**
 * 取得要顯示給使用者的錯誤訊息：示範帳號不能修改（403）、請求太頻繁（429）時顯示後端回傳的說明；
 * 登入逾時（401）用固定的說明（後端依原因分成過期、無效等，對使用者來說都是要重新登入）；
 * 其他錯誤用呼叫端傳入的預設文字
 */
export function apiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: unknown }>(error)) {
    const status = error.response?.status
    if (status === 401) return '登入已逾時，請重新登入'
    const message = error.response?.data?.message
    if (status && SHOW_SERVER_MESSAGE.includes(status) && typeof message === 'string') {
      return message
    }
  }
  return fallback
}
