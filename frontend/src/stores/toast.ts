import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastStatus = 'success' | 'danger'

export interface Toast {
  id: number
  msg: string
  status: ToastStatus
}

// 舊版 Toasts.vue:右上角疊加顯示,5 秒後自動移除,也可以按 × 提早關掉
const AUTO_DISMISS_MS = 5000

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let nextId = 0

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function push(msg: string, status: ToastStatus = 'success') {
    const id = nextId++
    toasts.value.push({ id, msg, status })
    setTimeout(() => remove(id), AUTO_DISMISS_MS)
  }

  return { toasts, push, remove }
})
