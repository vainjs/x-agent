import type { OutputChunk } from 'rollup'
import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import $path from 'path'

type EntryAlias = { [entryAlias: string]: string }

type VitePluginMpaOptions = {
  outDir?: EntryAlias
  input: EntryAlias
}

function getFileName(name: string, fileName: string, outDir: EntryAlias) {
  return $path.join(
    outDir[name] ? outDir[name].replace(/\.{3,}/g, '.') : '',
    `${name}${$path.extname(fileName)}`
  )
}

function isHtml(fileName: string = '') {
  return fileName.endsWith('.html')
}

function vitePluginMpa(options: VitePluginMpaOptions): Plugin {
  const { input, outDir = {} } = options
  const isEntryFile = createFilter(Object.values(input))

  return {
    name: 'vite-plugin-mpa',
    config: () => ({ build: { rollupOptions: { input } } }),
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        Object.values(bundle).forEach((chunk) => {
          const { isEntry, name, facadeModuleId, fileName } = chunk as OutputChunk

          if (isEntry && isEntryFile(facadeModuleId)) {
            if (isHtml(facadeModuleId!)) return
            delete bundle[fileName]
            const newFileName = getFileName(name, fileName, outDir)
            chunk.fileName = newFileName
            bundle[newFileName] = chunk
          }
        })
      }
    }
  }
}

export default vitePluginMpa
