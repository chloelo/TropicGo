import { ref, shallowRef } from 'vue'
import type { PaginationMeta } from '@/api/tropicgo-api'

/**
 * 後台分頁表格的資料載入。總頁數直接用 API 回傳的 meta，每頁筆數由後端決定。
 * data 用 shallowRef：每次整批替換陣列，不需要深層響應式，也避開泛型陣列的型別推斷問題
 */
export function useTable<T>(
  fetchPage: (page: number) => Promise<{ data: T[]; meta: PaginationMeta }>,
) {
  const data = shallowRef<T[]>([])
  const page = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)

  async function load(targetPage = page.value) {
    loading.value = true
    try {
      const result = await fetchPage(targetPage)
      data.value = result.data
      totalPages.value = Math.max(1, result.meta.totalPages)
      page.value = targetPage
    } finally {
      loading.value = false
    }
  }

  return { data, page, totalPages, loading, load }
}
