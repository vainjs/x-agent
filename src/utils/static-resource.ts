import type { ProxyConfig } from '@/type'
import { storage } from 'wxt/storage'
import { STATIC_STORAGE_KEY } from '@/enum'

export const DEFAULT_CONFIG: ProxyConfig = {
  proxy: []
}

export async function getConfig() {
  return ((await storage.getItem(`local:${STATIC_STORAGE_KEY}`)) as ProxyConfig) || DEFAULT_CONFIG
}

export async function saveConfig(configJson?: string) {
  try {
    const config = configJson ? JSON.parse(configJson) : DEFAULT_CONFIG
    await storage.setItem(`local:${STATIC_STORAGE_KEY}`, config)
  } catch (e) {
    console.error(e)
  }
}
