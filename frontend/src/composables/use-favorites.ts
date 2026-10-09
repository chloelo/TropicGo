import { useLocalStorage } from '@vueuse/core'
import { useToastStore } from '@/stores/toast'

const STORAGE_KEY = 'tropicgo_favorites'

// 用 module-level 的共用 ref 當簡易全域狀態,不用 Pinia 也能跨元件共享(純 localStorage,沒有會員系統)
const favoriteIds = useLocalStorage<string[]>(STORAGE_KEY, [])

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
