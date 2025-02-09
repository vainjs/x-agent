<script setup lang="ts">
// import { SaveIcon } from 'tdesign-icons-vue-next'
import { ref, watchEffect } from 'vue'
import { getConfigJson, saveConfigJson, formatJson, DEFAULT_CONFIG } from '@/utils'
import Codemirror from '@/components/VCodemirror.vue'

const configJson = ref(formatJson(DEFAULT_CONFIG))

onMounted(async () => {
  configJson.value = await getConfigJson()
})

watchEffect(() => {
  saveConfigJson(configJson.value)
})
</script>

<template>
  <section :class="$style.container">
    <header :class="$style.header">
      <t-switch theme="primary" />
      <!-- <SaveIcon
        :style="{ cursor: 'pointer' }"
        size="large"
      /> -->
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
