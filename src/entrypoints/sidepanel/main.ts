import '@/base.css'
import 'tdesign-vue-next/dist/reset.css'
import 'tdesign-vue-next/es/style/index.css'
import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
