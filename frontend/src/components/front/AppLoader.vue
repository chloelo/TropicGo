<script setup lang="ts">
  import { useLoadingStore } from '@/stores/loading'

  const loadingStore = useLoadingStore()
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
  >
    <div
      v-if="loadingStore.visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center"
      aria-busy="true"
      aria-label="載入中"
    >
      <div class="absolute inset-0 bg-white opacity-50" />
      <svg
        class="relative"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        stroke="#000"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  </Transition>
</template>
