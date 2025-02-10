import type { DeclarativeNetRequest } from 'wxt/browser'
import type { InterceptRule, ProxyConfig } from '@/type'
import { get } from '@vainjs/ore'
import { API_STORAGE_KEY, STATIC_STORAGE_KEY } from '@/enum'
import { getRules, getConfig } from '@/utils'

export default defineBackground(async () => {
  const getStaticResourceRules = async (config?: ProxyConfig) => {
    config = config ?? (await getConfig())
    return config.proxy.map((rule, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          regexSubstitution: rule[1].replace(/\$(\d+)/g, '\\$1')
        }
      },
      condition: {
        regexFilter: rule[0],
        resourceTypes: ['script', 'stylesheet']
      }
    })) as DeclarativeNetRequest.Rule[]
  }

  const getApiRules = async (rules?: InterceptRule[]) => {
    rules = rules ?? (await getRules())
    return rules.map((rule, index) => ({
      id: 1000 + index + 1,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          url: `data:application/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(rule.response.data)
          )}`
        }
      },
      condition: {
        urlFilter: rule.pattern,
        resourceTypes: ['xmlhttprequest']
      }
    })) as DeclarativeNetRequest.Rule[]
  }

  const updateRules = async (dynamicRules: DeclarativeNetRequest.Rule[]) => {
    console.log(dynamicRules)
    if (dynamicRules.length > 0) {
      await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: dynamicRules.map((rule) => rule.id),
        addRules: dynamicRules
      })
    }
  }

  updateRules([...(await getStaticResourceRules()), ...(await getApiRules())])

  browser.storage.onChanged.addListener(async (changes, areaName) => {
    const staticResourceRules = changes[STATIC_STORAGE_KEY]
    const apiRules = changes[API_STORAGE_KEY]
    if (areaName === 'local') {
      const newStaticResourceRules = await getStaticResourceRules(
        get(staticResourceRules, 'newValue')
      )
      const newApiRules = await getApiRules(get(apiRules, 'newValue'))

      updateRules([...newStaticResourceRules, ...newApiRules])
    }
  })
})
