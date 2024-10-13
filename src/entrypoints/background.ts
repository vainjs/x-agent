import { storage } from 'wxt/storage'
import type { InterceptRule, MessageData } from '../type'
// import { createResponse, defaultRules } from '../utils/api-proxy'
import { API_STORAGE_KEY, MESSAGE_TYPE } from '../enum'

export default defineBackground(() => {
  // const interceptRules: InterceptRule[] = [...defaultRules]
  // browser.webRequest.onBeforeRequest.addListener(
  //   (details) => {
  //     if (!details.url) return
  //   },
  //   { urls: ['<all_urls>'] }, // 这里的URL应该与manifest.json中的声明一致
  //   ['blocking'] // 指定为阻塞模式
  // )
  // // 使用 fetch 监听器来处理请求
  // browser.webRequest.onBeforeSendHeaders.addListener(
  //   (details) => {
  //     if (!details.url) return
  //     for (const rule of interceptRules) {
  //       if (rule.enabled && matchRule(details.url, rule)) {
  //         const response = createResponse(rule)
  //         return { response }
  //       }
  //     }
  //   },
  //   { urls: ['<all_urls>'] },
  //   ['blocking']
  // )
  // browser.runtime.onMessage.addListener((message: MessageData, sender, sendResponse) => {
  //   console.log('==========', MESSAGE_TYPE.UPDATE_INTERCEPT_RULES, message)
  //   switch (message.type) {
  //     case MESSAGE_TYPE.UPDATE_INTERCEPT_RULES:
  //       storage.setItem(API_STORAGE_KEY, message.payload)
  //       sendResponse({ success: true })
  //       break
  //     default:
  //       sendResponse({ success: false })
  //       break
  //   }
  // })
})
