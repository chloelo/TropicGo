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
