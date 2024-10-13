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
      <v-switch color="primary" hide-details />
    </header>
    <Codemirror :class="$style.codemirror" />
  </section>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: right;
  padding: 0 16px;
}

.codemirror {
  flex: 1;
}
</style>
