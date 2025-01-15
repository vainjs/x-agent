<script setup lang="ts">
import { type InterceptRule } from '@/type'
import { VALIDATION_RULES } from '@/utils/api-proxy'
import Codemirror from '@/components/VCodemirror.vue'

const emit = defineEmits<{
  save: [rule: InterceptRule]
}>()

const modelValue = defineModel<InterceptRule>({ default: {} })
const modelVisible = defineModel<boolean>('visible')
const form = ref()

const closeDialog = () => {
  modelVisible.value = false
}

const onOk = async () => {
  const valid = await form.value.validateOnly()
  if (!valid) return
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
      labelAlign="top"
      ref="form"
    >
      <t-form-item label="匹配规则（支持正则表达式）">
        <t-input
          :rules="VALIDATION_RULES.pattern"
          v-model="modelValue.pattern"
          clearable
        />
      </t-form-item>
      <t-form-item label="状态码 (100-599)">
        <t-input-number
          v-model="modelValue.response.status"
          :rules="VALIDATION_RULES.status"
        />
      </t-form-item>
      <t-form-item label="响应数据">
        <Codemirror
          :rules="VALIDATION_RULES.responseData"
          v-model="modelValue.response.data"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
