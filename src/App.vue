<template>
  <div id="app">
    <Toast></Toast>
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
// @import '~bootstrap/scss/bootstrap';
// @import 'bootstrap';

// #front-nav {
//   a {
//     &.router-link-exact-active {
//       color: rgba(0, 0, 0, 0.7);
//     }
//   }
// }
// h2 {
//   text-align: center;
// }
// #back-nav {
//   a {
//     &.router-link-exact-active {
//       color: rgba(255, 255, 255, 0.75);
//     }
//   }
// }
</style>
