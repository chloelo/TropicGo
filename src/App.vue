<template>
  <div id="app">
    <Toast />
    <router-view />
  </div>
</template>

<script>
import Toast from '@/components/Toasts.vue';

export default {
  name: 'App',
  components: {
    Toast,
  },
};
</script>
<style lang="scss">
  @import './assets/scss/all';
</style>
