import { map, isEmpty } from 'lodash-es'
import { getConfig, getStaticResourceRules, getSwitchConfig } from '@/utils'

export default defineBackground(async () => {
  let removeRuleIds: number[] = []

  const updateRules = async () => {
    const switchEnabled = await getSwitchConfig()
    if (!switchEnabled) {
      await browser.declarativeNetRequest.updateDynamicRules({ removeRuleIds })
      return
    }
    const addRules = getStaticResourceRules(await getConfig())
    if (isEmpty(addRules)) return
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules
    })
    removeRuleIds = map(addRules, 'id')
  }

  updateRules()

  browser.storage.onChanged.addListener(async (_, areaName) => {
    if (areaName === 'local') {
      updateRules()
    }
  })
})
