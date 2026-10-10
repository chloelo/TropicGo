import type { Directive } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

// 捲動進場動畫，取代 2018 年後就沒有正式版的 aos 套件，觸發規則照 AOS 2.3.4：
// 「視窗高度 + 已捲動距離 > 元素位置 + 120px」就加上 .aos-animate，捲回觸發線以下就拿掉，捲動事件 99ms 節流。
// 位置用 offsetTop 累加，不用 getBoundingClientRect 或 IntersectionObserver：
// 動畫初始狀態本身就有 scale、translate，用畫出來的框判斷，觸發時機會不準
const OFFSET = 120

const elements = new Set<HTMLElement>()
let listening = false

function layoutTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop - (node.tagName !== 'BODY' ? node.scrollTop : 0)
    node = node.offsetParent as HTMLElement | null
  }
  // 外層元素的 translateY 也要算進去（元素自己的 transform 是動畫本身，不算）。
  // 例如首頁地區卡用外層 translate 做上下交錯，往上移的兩張要比較早出現
  for (let parent = el.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
    const { transform } = getComputedStyle(parent)
    if (transform !== 'none') top += new DOMMatrixReadOnly(transform).m42
  }
  return top
}

function check(el: HTMLElement) {
  const reached = window.innerHeight + window.scrollY > layoutTop(el) + OFFSET
  el.classList.toggle('aos-animate', reached)
}

function checkAll() {
  elements.forEach(check)
}

function listen() {
  if (listening) return
  listening = true
  const throttled = useThrottleFn(checkAll, 99)
  useEventListener(window, 'scroll', throttled, { passive: true })
  useEventListener(window, 'resize', throttled, { passive: true })
  // 圖片載入後會把下面的元素往下推，位置要重算
  useEventListener(window, 'load', checkAll)
}

/**
 * 捲動進場動畫。用法：v-aos:zoom-in、v-aos:fade-up、v-aos:flip-up；
 * data-aos-duration、data-aos-delay 直接寫在元素上（樣式在 assets/aos.css）
 */
export const vAos: Directive<HTMLElement, undefined, string, string> = {
  beforeMount(el, binding) {
    // 掛上去之前先設好初始（隱藏）狀態，不會先閃一下完整畫面
    el.dataset.aos = binding.arg
  },
  mounted(el) {
    listen()
    elements.add(el)
    // 等初始狀態畫到畫面上再判斷，已經在視窗內的元素才會有進場動畫
    requestAnimationFrame(() => requestAnimationFrame(() => check(el)))
  },
  unmounted(el) {
    elements.delete(el)
  },
}
