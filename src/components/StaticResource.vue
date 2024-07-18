<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  saveSwitchConfig,
  getSwitchConfig,
  DEFAULT_CONFIG,
  saveConfig,
  formatJson,
  getConfig,
} from '@/utils'
import Codemirror from '@/components/VCodemirror.vue'

const configJson = ref(formatJson(DEFAULT_CONFIG))
const switchConfig = ref(false)

onMounted(() => {
  getConfig().then((config) => {
    configJson.value = formatJson(config)
  })
  getSwitchConfig().then((v) => {
    switchConfig.value = v
  })
})

watch(
  configJson,
  () => {
    saveConfig(configJson.value)
  },
  { flush: 'post' }
)

watch(
  switchConfig,
  () => {
    saveSwitchConfig(switchConfig.value)
  },
  { flush: 'post' }
)
</script>

<template>
  <section :class="$style.container">
    <header :class="$style.header">
      <t-switch
        v-model="switchConfig"
        theme="primary"
      />
    </header>
    <Codemirror
      :class="$style.codemirror"
      v-model="configJson"
    />
  </section>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 6px;
}

.header {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--td-text-color-secondary);
}

.codemirror {
  flex: 1;
}
</style>
