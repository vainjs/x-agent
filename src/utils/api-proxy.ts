import type { InterceptRule } from '../type'
import { storage } from 'wxt/storage'
import { API_STORAGE_KEY } from '../enum'

export const DEFAULT_RULE: InterceptRule = {
  pattern: 'api.example.com/test',
  response: {
    status: 200,
    data: JSON.stringify({ message: 'This is a mocked response' }, null, 2),
    headers: {
      'Content-Type': 'application/json'
    }
  },
  enabled: true
}

export const VALIDATION_RULES = {
  pattern: [
    (v: string) => !!v || '请输入匹配规则',
    (v: string) => {
      try {
        new RegExp(v)
        return true
      } catch {
        return '无效的正则表达式'
      }
    }
  ],
  status: [
    (v: number) => !!v || '请输入状态码',
    (v: number) => Number.isInteger(v) || '状态码必须是整数',
    (v: number) => (v >= 100 && v < 600) || '状态码必须在 100-599 之间'
  ],
  responseData: [
    (v: string) => !!v || '请输入响应数据',
    (v: string) => {
      try {
        JSON.parse(v)
        return true
      } catch {
        return 'JSON 格式不正确'
      }
    }
  ]
}

// 创建自定义响应
export function createResponse(rule: InterceptRule): Response {
  const responseBody = JSON.stringify(rule.response.data)
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...rule.response.headers
  })

  return new Response(responseBody, {
    status: rule.response.status,
    headers: headers
  })
}

export async function saveRules(rules: InterceptRule[]) {
  await storage.setItem(API_STORAGE_KEY, toRaw(rules))
}

export async function getRules() {
  const rules = await storage.getItem(API_STORAGE_KEY)
  return (rules || []) as InterceptRule[]
}
