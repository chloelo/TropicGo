<script setup lang="ts">
  import { computed } from 'vue'
  import { useWindowScroll } from '@vueuse/core'

  // 舊版 ToTop.vue:捲動超過 300px 才顯示,顯示時 bottom 從 30px 收到 15px、opacity 0→0.8
  const { y } = useWindowScroll()
  const visible = computed(() => y.value >= 300)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<template>
  <button
    class="fixed right-[15px] z-20 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center transition-all duration-500 ease-in-out"
    :class="visible ? 'opacity-80 bottom-[15px]' : 'opacity-0 bottom-[30px] pointer-events-none'"
    @click="scrollToTop"
  >
    <span class="i-fa6-chevron-up text-lg" />
  </button>
</template>
