import type { Plugin, ResolvedConfig } from 'vite'
import type { OutputChunk } from 'rollup'
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
  let config: ResolvedConfig

  const resolve = (...paths: string[]) => $path.resolve(config.root, ...paths)

  const getNameByEntry = (input: EntryAlias, entry: string) => {
    for (const name in input) {
      if (resolve(input[name]) === resolve(entry)) {
        return name
      }
    }
  }

  return {
    name: 'vite-plugin-mpa',
    config: () => ({ build: { rollupOptions: { input } } }),
    configResolved: (resolvedConfig) => {
      config = resolvedConfig
    },
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
    // transformIndexHtml: {
    //   order: 'post',
    //   handler: (html, ctx) => {
    //     // console.log('====================', html)
    //     return html
    //   }
    // },
    // writeBundle(_, bundle) {
    //   Object.values(bundle).forEach((chunk) => {
    //     const { fileName } = chunk
    //     if (!isHtml(fileName)) return
    //     const resolveFileName = resolve(fileName)
    //     if (!isEntryFile(resolveFileName)) return

    //     const newFileName = getFileName(
    //       getNameByEntry(input, resolveFileName)!,
    //       resolveFileName,
    //       outDir
    //     )
    //     delete bundle[fileName]
    //     chunk.fileName = newFileName
    //     bundle[newFileName] = chunk
    //   })
    // }
  }
}

export default vitePluginMpa
