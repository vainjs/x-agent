import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import manifest from './manifest.config'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    open: 'src/pages/aside/index.html'
  },
  plugins: [vue(), vuetify({ autoImport: true }), crx({ manifest })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
