import { createMemoryHistory, createRouter } from 'vue-router'

import StaticResource from './components/StaticResource.vue'

const routes = [
  { path: '/', component: StaticResource },
  { path: '/api', component: StaticResource }
]

export default createRouter({
  history: createMemoryHistory(),
  routes
})
