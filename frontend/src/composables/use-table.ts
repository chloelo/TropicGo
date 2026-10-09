import { ref, shallowRef } from 'vue'

// 簡化版:對應我們後端 { data, meta: { page, pageSize, total, totalPages } } 的分頁格式
// (前公司版本是 skip/take + local/remote 雙模式,TropicGo 的後台列表用不到那麼複雜的篩選邏輯)
// data 用 shallowRef:每次整批替換陣列,不需要深層響應式,順便避開 reactive() 在泛型陣列上的型別推斷問題
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
