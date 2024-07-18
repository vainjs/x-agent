import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/i18n/module'],
  manifest: {
    permissions: ['declarativeNetRequest', 'background', 'storage'],
    host_permissions: ['<all_urls>'],
    default_locale: 'en',
    name: 'AnyProxy'
  },
  vite: () => ({
    plugins: [
      AutoImport({
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ]
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ]
      })
    ]
  })
})
