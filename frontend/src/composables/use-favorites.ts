import { useLocalStorage } from '@vueuse/core'
import { useToastStore } from '@/stores/toast'

const STORAGE_KEY = 'tropicgo_favorites'

// 放在 module 層級的共用 ref，不用 Pinia 也能跨元件共享（存在 localStorage，沒有會員系統）
const favoriteIds = useLocalStorage<string[]>(STORAGE_KEY, [])

/** 我的收藏：記錄產品 id */
export function useFavorites() {
  const toast = useToastStore()

  function isFavorite(id: string): boolean {
    return favoriteIds.value.includes(id)
  }

  function toggleFavorite(id: string) {
    const index = favoriteIds.value.indexOf(id)
    if (index >= 0) {
      favoriteIds.value.splice(index, 1)
      toast.push('已取消此筆收藏', 'danger')
    } else {
      favoriteIds.value.push(id)
      toast.push('已新增此筆收藏')
    }
  }

  return { favoriteIds, isFavorite, toggleFavorite }
}
