import { defineManifest } from '@crxjs/vite-plugin'
import { version, description } from './package.json'

export default defineManifest(async () => ({
  icons: {
    '48': 'src/assets/icon.png'
  },
  permissions: ['sidePanel'],
  background: {
    service_worker: 'src/background.ts'
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content.ts']
    }
  ],
  side_panel: {
    default_path: 'src/pages/aside/index.html'
  },
  manifest_version: 3,
  name: 'XAgent',
  description,
  version
}))
