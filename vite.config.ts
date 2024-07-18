import { type Plugin, type ResolvedConfig, defineConfig } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { fileURLToPath, URL } from 'node:url'
import { resolve, join, extname } from 'path'
import type { OutputChunk } from 'rollup'
import vue from '@vitejs/plugin-vue'

type VitePluginMpaOptions = {
  outDir?: { [entryAlias: string]: string }
  input: { [entryAlias: string]: string }
}

function vitePluginMpa(options: VitePluginMpaOptions): Plugin {
  const { input, outDir = {} } = options
  const filter = createFilter(Object.values(input))
  let config: ResolvedConfig

  return {
    name: 'vite-plugin-mpa',
    config: () => ({ build: { rollupOptions: { input } } }),
    configResolved: (resolvedConfig) => {
      config = resolvedConfig
    },
    async generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName] as OutputChunk
        const { isEntry, name, facadeModuleId } = chunk

        if (isEntry && filter(facadeModuleId)) {
          if (!facadeModuleId!.endsWith('.html')) {
            delete bundle[fileName]
            const newFileName = join(
              outDir[name] ? outDir[name].replace(/\.{3,}/g, '.') : '',
              `${name}${extname(fileName)}`
            )
            chunk.fileName = newFileName
            bundle[newFileName] = chunk
          }
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vitePluginMpa({
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        content: resolve(__dirname, 'src/content.ts')
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
