<script setup lang="ts">
import { type InterceptRule } from '@/type'
import { VALIDATION_RULES, formatJson } from '@/utils'
import Codemirror from '@/components/VCodemirror.vue'

const emit = defineEmits<{
  save: [rule: InterceptRule]
}>()

const modelValue = defineModel<InterceptRule>({ default: {} })
const modelVisible = defineModel<boolean>('visible')
const form = ref()

const responseData = computed({
  get: () => {
    return formatJson(modelValue.value.response.data)
  },
  set: async (newValue) => {
    try {
      const data = newValue ? JSON.parse(newValue) : newValue
      modelValue.value.response.data = data
    } catch (e) {
      console.error(e)
    }
  }
})

const closeDialog = () => {
  modelVisible.value = false
}

const onOk = async () => {
  const valid = await form.value.validateOnly()
  if (valid !== true) return
  emit('save', toRaw(modelValue.value))
  closeDialog()
}
</script>

<template>
  <t-dialog
    v-model:visible="modelVisible"
    header="添加规则"
    @confirm="onOk"
    width="90%"
  >
    <t-form
      :rules="VALIDATION_RULES"
      :data="modelValue"
      labelAlign="top"
      ref="form"
    >
      <t-form-item
        label="匹配规则（支持正则表达式）"
        name="pattern"
      >
        <t-input
          v-model="modelValue.pattern"
          clearable
        />
      </t-form-item>
      <t-form-item
        label="状态码 (100-599)"
        name="response.status"
      >
        <t-input-number v-model="modelValue.response.status" />
      </t-form-item>
      <t-form-item label="响应数据">
        <Codemirror
          @blur="() => form.value.validate({ fields: ['response.data'] })"
          v-model="responseData"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
