<script setup lang="ts">
  import { h } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import type { MenuOption } from 'naive-ui'

  const route = useRoute()

  function renderLink(label: string, to: string) {
    return () => h(RouterLink, { to }, { default: () => label })
  }

  const menuOptions: MenuOption[] = [
    { label: renderLink('儀表板', '/admin'), key: '/admin' },
    { label: renderLink('產品管理', '/admin/tours'), key: '/admin/tours' },
    { label: renderLink('優惠券管理', '/admin/coupons'), key: '/admin/coupons' },
    { label: renderLink('訂單管理', '/admin/orders'), key: '/admin/orders' },
  ]
</script>

<template>
  <n-menu :value="route.path" :options="menuOptions" />
</template>
