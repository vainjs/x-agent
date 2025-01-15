<script setup lang="ts">
import Codemirror from '@/components/VCodemirror.vue'
import { ref, watchEffect } from 'vue'

const json = ref('')

watchEffect(() => {
  console.log('====================', json.value)
})
</script>

<template>
  <section :class="$style.container">
    <header :class="$style.header">
      <t-switch theme="primary" />
    </header>
    <Codemirror :class="$style.codemirror" />
  </section>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 4px;
}

.header {
  display: flex;
  justify-content: right;
  padding-bottom: 6px;
}

.codemirror {
  flex: 1;
}
</style>
