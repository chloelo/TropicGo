import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import $ from 'jquery';
import {
  ValidationObserver, ValidationProvider, localize, configure,
} from 'vee-validate/dist/vee-validate.full';
import TW from 'vee-validate/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import './assets/js/filters';

window.$ = $;
Vue.use(VueAxios, axios);

Vue.component('loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.prototype.$bus = new Vue();
localize('zh_TW', TW);
// 驗證表單 Class 設定
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
