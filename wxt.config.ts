import vuetify from 'vite-plugin-vuetify'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  // @ts-ignore
  vite: () => ({
    plugins: [vuetify({ autoImport: true })]
  })
})
