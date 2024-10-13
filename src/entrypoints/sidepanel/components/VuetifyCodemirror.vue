<script setup lang="ts">
import { ref } from 'vue';
import cls from 'classnames'
import Codemirror from '@/components/VCodemirror.vue'

type ValidationRule = (v: any) => boolean | string

const { validateOn = 'blur', rules = [], label } = defineProps<{
  rules?: ValidationRule[]
  validateOn?: 'blur'
  label?: string
}>()

const model = defineModel<string>()
const errorMessages = ref<string[]>([])
const isValid = ref(true)

const validate = (): boolean => {
  errorMessages.value = []

  for (const rule of rules) {
    const result = rule(model.value)
    if (result !== true) {
      errorMessages.value.push(result as string)
      isValid.value = false
      return false
    }
  }

  isValid.value = true
  return true
}

const onBlur = (): void => {
  if (validateOn === 'blur') {
    validate()
  }
}

defineExpose({
  validate,
  reset: () => {
    errorMessages.value = []
    isValid.value = true
  }
})
</script>

<template>
  <div :class="cls('v-text-field', { 'v-input--error': !isValid })">
    <div>
      <label v-if="label">{{ label }}</label>
      <Codemirror v-model="model" @blur="onBlur"
        :style="{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }" />
    </div>
    <div class="v-input__details">
      <div class="v-messages" role="alert" aria-live="polite">
        <transition-group name="message-transition">
          <div v-if="!isValid" class="v-messages__message">
            {{ errorMessages[0] }}
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-transition-move,
.message-transition-enter-active,
.message-transition-leave-active {
  transition: all 0.3s ease;
}

.message-transition-enter-from,
.message-transition-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.message-transition-leave-active {
  position: absolute;
}
</style>