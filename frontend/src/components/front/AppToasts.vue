<script setup lang="ts">
  import { useToastStore } from '@/stores/toast'

  const toastStore = useToastStore()
</script>

<template>
  <div class="fixed top-[15px] right-[15px] z-[10000] w-max max-w-[calc(100vw-30px)]">
    <TransitionGroup
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="max-w-[350px] text-[14px] bg-white/85 backdrop-blur-[10px] border border-black/10 shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] rounded-[4px] not-last:mb-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="flex items-center px-3 py-1 bg-white/85 border-b border-black/5 text-[#6c757d]">
          <strong
            class="mr-auto font-bold flex items-center gap-1"
            :class="toast.status === 'success' ? 'text-secondary' : 'text-[#dc3545]'"
          >
            <span class="i-fa6-comments" />
            Tropic Go
          </strong>
          <small class="ml-4 text-[11.2px]">現在</small>
          <button
            type="button"
            class="ml-2 mb-1 text-[24px] font-bold leading-none text-black opacity-50 hover:opacity-75"
            aria-label="關閉"
            @click="toastStore.remove(toast.id)"
          >
            &times;
          </button>
        </div>
        <div class="p-3">{{ toast.msg }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>
