import vuetify from 'vite-plugin-vuetify'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue', '@wxt-dev/i18n/module'],
  manifest: {
    permissions: ['storage', 'background'],
    default_locale: 'en'
  },
  srcDir: 'src',
  vite: () => ({
    plugins: [vuetify({ autoImport: true })]
  })
})
