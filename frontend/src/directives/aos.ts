import type { Directive } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

// 取代 aos 套件(2018 年後就沒有正式版)的捲動進場動畫。觸發規則照 AOS 2.3.4 原始碼:
// 「視窗高度 + 已捲動距離 > 元素版面位置 + 120px」就加上 .aos-animate,
// 往回捲到觸發線以下就拿掉(往下捲會再播一次),捲動事件 99ms 節流。
// 位置用 offsetTop 累加,不用 getBoundingClientRect / IntersectionObserver——
// 動畫初始狀態本身就有 scale / translate / rotate,用畫出來的框判斷,觸發時機會跟舊版對不上
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
  // 外層元素的 translateY 也要算進去(元素自己的 transform 是動畫本身,不算)。
  // 首頁地區卡的「上下交錯」是外層 -translate-y-[50px],舊版是直接用 margin 讓卡片變高,
  // 所以高的那兩張會比較早出現;只看 offsetTop 的話四張會同時出現
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
  // 圖片載入完會把下面的元素往下推,版面位置要重算
  useEventListener(window, 'load', checkAll)
}

// 用法:v-aos:zoom-in / v-aos:fade-up / v-aos:flip-up
// data-aos-duration、data-aos-delay 直接寫在元素上(樣式在 assets/aos.css)
export const vAos: Directive<HTMLElement, undefined, string, string> = {
  beforeMount(el, binding) {
    // 掛上去之前就先設好初始(隱藏)狀態,不會先閃一下完整畫面
    el.dataset.aos = binding.arg
  },
  mounted(el) {
    listen()
    elements.add(el)
    // 等初始狀態真的畫到畫面上再判斷,已經在視窗內的元素才會有進場動畫
    requestAnimationFrame(() => requestAnimationFrame(() => check(el)))
  },
  unmounted(el) {
    elements.delete(el)
  },
}
