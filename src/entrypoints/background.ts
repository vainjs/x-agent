import type { DeclarativeNetRequest } from 'wxt/browser'
import type { ProxyConfig } from '@/type'
import { get, map, isEmpty } from 'lodash-es'
import { getConfig, getStaticResourceRules } from '@/utils'
import { STATIC_STORAGE_KEY } from '@/enum'

export default defineBackground(async () => {
  let removeRuleIds: number[] = []

  const updateRules = async (addRules: DeclarativeNetRequest.Rule[]) => {
    if (isEmpty(addRules)) return
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules
    })
    removeRuleIds = map(addRules, 'id')
  }

  updateRules(getStaticResourceRules(await getConfig()))

  //

  browser.storage.onChanged.addListener(async (changes, areaName) => {
    const staticResourceRules = changes[STATIC_STORAGE_KEY]
    // const apiRules = changes[API_STORAGE_KEY]
    if (areaName === 'local') {
      updateRules(getStaticResourceRules(get(staticResourceRules, 'newValue') as ProxyConfig))
    }
  })
})
