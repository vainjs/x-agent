export type InterceptRule = {
  pattern: string
  response: {
    status: number // HTTP 状态码
    data: any // 响应数据
    headers?: Record<string, string> // 自定义响应头
  }
  enabled: boolean // 是否启用
}

export type ProxyConfig = { proxy?: Array<[string, string]> }
