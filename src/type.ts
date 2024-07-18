import { EVENT_MESSAGE_ACTION } from './enum'

export type InterceptRule = {
  pattern: string
  response: {
    status: number
    data: any
    headers?: Record<string, string>
  }
  enabled: boolean
}

export type ProxyConfig = { proxy: Array<[string, string]> }

export type Message = {
  action: EVENT_MESSAGE_ACTION
}
