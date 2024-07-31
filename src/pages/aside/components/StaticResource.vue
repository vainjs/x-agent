<script setup lang="ts">
import Codemirror from '@/components/VCodemirror.vue'
import { ref, watchEffect } from 'vue'

const json = ref('')

watchEffect(() => {
  console.log('====================', json.value)
})

</script>

<template>
  <Codemirror />
</template>

<style lang="scss" module></style>
