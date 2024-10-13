import { createWebHashHistory, createRouter } from 'vue-router'

import StaticResource from './components/StaticResource.vue'
import Api from './components/Api.vue'

const routes = [
  { path: '/', component: StaticResource },
  { path: '/api', component: Api }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
