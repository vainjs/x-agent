import type { ProxyConfig } from '@/type'
import { storage } from 'wxt/storage'
import { STATIC_STORAGE_KEY } from '@/enum'
import { formatJson } from '@/utils'

export const DEFAULT_CONFIG: ProxyConfig = {
  proxy: []
}

export async function getConfigJson() {
  const config = (await storage.getItem(STATIC_STORAGE_KEY)) || DEFAULT_CONFIG
  return formatJson(config)
}

export async function saveConfigJson(configJson?: string) {
  try {
    const config = configJson ? JSON.parse(configJson) : DEFAULT_CONFIG
    await storage.setItem(STATIC_STORAGE_KEY, config)
  } catch (e) {
    console.error(e)
  }
}
