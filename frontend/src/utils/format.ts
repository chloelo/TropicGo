import dayjs from 'dayjs'

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return ''
  return `NT$ ${value.toLocaleString('zh-TW')}`
}

export function formatDate(value?: string | number | null): string {
  if (!value) return '—'
  return dayjs(value).format('YYYY/MM/DD')
}

export function formatDateTime(value?: string | number | null): string {
  if (!value) return '—'
  return dayjs(value).format('YYYY/MM/DD HH:mm')
}

// n-date-picker 給的 timestamp 是「當地時區那一天的凌晨」,dayjs 預設就是用當地時區顯示/格式化,
// 不會像 toISOString() 先轉 UTC 再切字串,所以這裡不會有少一天的時區位移問題
export function toLocalDateString(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD')
}
