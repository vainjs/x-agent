import type { DeclarativeNetRequest } from 'wxt/browser'
import type { InterceptRule } from '@/type'
import { get } from '@vainjs/ore'
import { API_STORAGE_KEY } from '@/enum'
import { getRules } from '@/utils'

export default defineBackground(async () => {
  const rules = await getRules()

  const updateRules = async (rules: InterceptRule[]) => {
    console.log('updateRules', rules)
    const dynamicRules: DeclarativeNetRequest.Rule[] = rules.map((rule, index) => ({
      id: index + 1,
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
    }))
    console.log('dynamicRules', dynamicRules)
    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: dynamicRules.map((rule) => rule.id),
      addRules: dynamicRules
    })
    console.log('updateDynamicRules success')
  }

  updateRules(rules)

  browser.storage.onChanged.addListener((changes, areaName) => {
    console.log('onChanged', changes, areaName)
    const rules = changes[API_STORAGE_KEY]
    if (areaName === 'local' && rules) {
      updateRules(get(rules, 'newValue'))
    }
  })
})

// import type { DeclarativeNetRequest } from 'wxt/browser'
// import type { InterceptRule } from '@/type'
// import { get } from '@vainjs/ore'
// import { API_STORAGE_KEY } from '@/enum'
// import { getRules } from '@/utils'

// export default defineBackground(async () => {
//   self.addEventListener('fetch', (event) => {
//     console.log('Fetch event:', event.request.url)
//     const url = new URL(event.request.url)

//     if (url.pathname.endsWith('/dynamic-response')) {
//       event.respondWith(
//         new Response(
//           JSON.stringify({
//             intercepted: true,
//             originalUrl: url.searchParams.get('originalUrl'),
//             timestamp: Date.now()
//           }),
//           {
//             headers: new Headers({
//               'Content-Type': 'application/json',
//               'Access-Control-Allow-Origin': '*',
//               'Cache-Control': 'no-store' // 避免缓存干扰
//             }),
//             status: 200,
//             statusText: 'OK'
//           }
//         )
//       )
//     }
//   })

//   const rules = await getRules()

//   const updateRules = async (rules: InterceptRule[]) => {
//     console.log('updateRules', rules)
//     const dynamicRules: DeclarativeNetRequest.Rule[] = rules.map((rule, index) => ({
//       id: index + 1,
//       priority: 1,
//       action: {
//         type: 'redirect',
//         redirect: {
//           url: ''
//         }
//       },
//       condition: {
//         urlFilter: rule.pattern,
//         resourceTypes: ['xmlhttprequest']
//       }
//     }))
//     console.log('dynamicRules', dynamicRules)
//     await browser.declarativeNetRequest.updateDynamicRules({
//       removeRuleIds: dynamicRules.map((rule) => rule.id),
//       addRules: dynamicRules
//     })
//     console.log('updateDynamicRules success')
//   }

//   updateRules(rules)

//   browser.storage.onChanged.addListener((changes, areaName) => {
//     console.log('onChanged', changes, areaName)
//     const rules = changes[API_STORAGE_KEY]
//     if (areaName === 'local' && rules) {
//       updateRules(get(rules, 'newValue'))
//     }
//   })
// })
