<script setup lang="ts">
  // 上下間距不寫死在元件裡，由使用的地方自己加（例如 mb-12）
  withDefaults(defineProps<{ title: string; tag?: 'h2' | 'h3' }>(), { tag: 'h2' })

  const circleStyle = {
    backgroundImage:
      'linear-gradient(90deg, rgba(245,155,32,1) 0%, rgba(245,155,32,1) 50%, rgba(218,115,39,1) 51%, rgba(218,115,39,1) 100%)',
  }
</script>

<template>
  <component
    :is="tag"
    class="flex items-center justify-center font-medium leading-[1.2] text-primary"
    :class="tag === 'h2' ? 'text-[32px]' : 'text-[28px]'"
  >
    <span class="w-[35px] h-[35px] rounded-full mr-4 shrink-0" :style="circleStyle" />
    {{ title }}
  </component>
</template>
