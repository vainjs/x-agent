import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '../../assets/base.css'
import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App).use(createVuetify()).use(router).mount('#app')
