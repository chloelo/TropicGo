import { defineStore } from 'pinia'
import { ref } from 'vue'

// 超過這個時間還沒回應才顯示遮罩，API 很快回應時就不會一閃一閃
const SHOW_DELAY_MS = 200

/** 全域載入遮罩：計算進行中的 API 請求數，由 api/client.ts 的 axios 攔截器自動加減，各頁面不用自己管 */
export const useLoadingStore = defineStore('loading', () => {
  const visible = ref(false)
  let pending = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  function start() {
    pending++
    if (pending === 1) {
      timer = setTimeout(() => {
        if (pending > 0) visible.value = true
      }, SHOW_DELAY_MS)
    }
  }

  function stop() {
    pending = Math.max(0, pending - 1)
    if (pending === 0) {
      clearTimeout(timer)
      visible.value = false
    }
  }

  return { visible, start, stop }
})
