import 'virtual:uno.css'
import './assets/base.css'
import './assets/aos.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { vAos } from './directives/aos'
import router from './router'

createApp(App).use(createPinia()).use(router).directive('aos', vAos).mount('#app')
