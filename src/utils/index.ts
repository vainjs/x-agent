/**
 * 将类 JSON 字符串转换为标准 JSON 字符串
 */
export function normalizeJSON(input?: string): string {
  if (!input) return ''
  try {
    // 首先尝试直接解析
    return JSON.stringify(JSON.parse(input), null, 2)
  } catch {
    try {
      // 1. 只移除关键位置的空白字符，保留值中的空格
      let normalized = input.replace(/({|,|\[)\s+|\s+(?=}|\]|:)/g, '$1')

      // 2. 处理未加引号的键
      normalized = normalized.replace(/({|,)([a-zA-Z0-9_$]+?):/g, '$1"$2":')

      // 3. 处理单引号
      normalized = normalized.replace(/'([^']*)'(?=\s*[,}\]])/g, '"$1"')

      // 4. 处理末尾的逗号
      normalized = normalized.replace(/,\s*([}\]])/g, '$1')

      // 5. 验证并格式化
      return JSON.stringify(JSON.parse(normalized), null, 2)
    } catch (e) {
      throw new Error('Invalid JSON-like string')
    }
  }
}
