import dayjs from 'dayjs'

/** 金額格式：NT$ 89,000 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return ''
  return `NT$ ${value.toLocaleString('zh-TW')}`
}

/** 日期格式：YYYY/MM/DD，沒有值時顯示「—」 */
export function formatDate(value?: string | number | null): string {
  if (!value) return '—'
  return dayjs(value).format('YYYY/MM/DD')
}

/** 日期時間格式：YYYY/MM/DD HH:mm，沒有值時顯示「—」 */
export function formatDateTime(value?: string | number | null): string {
  if (!value) return '—'
  return dayjs(value).format('YYYY/MM/DD HH:mm')
}

/**
 * 把 n-date-picker 的 timestamp 轉成 YYYY-MM-DD。
 * 用 dayjs 依當地時區格式化，不會像 toISOString() 先轉成 UTC，日期少一天
 */
export function toLocalDateString(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD')
}

/**
 * 台灣的今天（YYYY-MM-DD），跟後端判斷「出發當天停止報名」用同一個標準。
 * 不用瀏覽器的時區：人在國外時，當地日期可能跟台灣差一天。
 * en-CA 語系的日期格式剛好是 YYYY-MM-DD
 */
export function getTaipeiToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date())
}
