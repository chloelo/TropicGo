import { ref, shallowRef } from 'vue'

/**
 * 後台分頁表格的資料載入。
 * data 用 shallowRef：每次整批替換陣列，不需要深層響應式，也避開泛型陣列的型別推斷問題
 */
export function useTable<T>(fetchPage: (page: number) => Promise<{ data: T[]; total: number }>) {
  const data = shallowRef<T[]>([])
  const page = ref(1)
  const total = ref(0)
  const loading = ref(false)

  async function load(targetPage = page.value) {
    loading.value = true
    try {
      const result = await fetchPage(targetPage)
      data.value = result.data
      total.value = result.total
      page.value = targetPage
    } finally {
      loading.value = false
    }
  }

  return { data, page, total, loading, load }
}
