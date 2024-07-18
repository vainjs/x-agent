<script setup lang="ts">
import { type InterceptRule } from '@/type'
import { AddIcon, DeleteIcon } from 'tdesign-icons-vue-next'
import { DialogPlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { saveRules, getRules, DEFAULT_RULE } from '@/utils'
import RuleDialog from './RuleDialog.vue'

const formState = ref<InterceptRule>({ ...DEFAULT_RULE })
const rules = ref<InterceptRule[]>([])
const dialog = ref(false)
const editIndex = ref(-1)

onMounted(async () => {
  rules.value = await getRules()
})

const onEdit = (index: number) => {
  formState.value = { ...rules.value[index] }
  editIndex.value = index
  dialog.value = true
}

const onAdd = () => {
  formState.value = { ...DEFAULT_RULE }
  editIndex.value = -1
  dialog.value = true
}

const onSaveRule = (newRule: InterceptRule) => {
  if (editIndex.value === -1) {
    rules.value.push(newRule)
  } else {
    rules.value.splice(editIndex.value, 1, newRule)
  }
}

const deleteRule = async (index: number) => {
  const confirm = DialogPlugin.confirm({
    header: '删除规则',
    body: '确认删除该规则？',
    width: '90%',
    onConfirm: () => {
      rules.value.splice(index, 1)
      confirm.destroy()
    }
  })
}

const toggleRule = (index: number) => {
  const rule = rules.value[index]
  rules.value.splice(index, 1, { ...rule, enabled: !rule.enabled })
}

watch(
  rules,
  () => {
    saveRules(toRaw(rules.value))
  },
  { deep: true }
)
</script>

<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <t-switch theme="primary" />
      <t-button
        @click="onAdd"
        theme="primary"
        shape="circle"
      >
        <template #icon>
          <AddIcon />
        </template>
      </t-button>
    </header>

    <t-list
      :class="$style.list"
      stripe
    >
      <t-list-item
        v-for="(rule, index) in rules"
        :class="$style.cursor"
        @click="onEdit(index)"
        :key="rule.pattern"
      >
        <span :class="$style.ellipsis">
          {{ rule.pattern }}
        </span>
        <template #action>
          <t-space
            :class="$style.action"
            @click.stop
          >
            <t-switch
              @change="toggleRule(index)"
              :value="rule.enabled"
              size="small"
            />
            <DeleteIcon
              @click="deleteRule(index)"
              :class="$style.cursor"
              size="medium"
            />
          </t-space>
        </template>
      </t-list-item>
    </t-list>

    <RuleDialog
      v-model:visible="dialog"
      v-model="formState"
      @save="onSaveRule"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.list {
  height: 0;
  flex: 1;

  .action {
    color: var(--td-text-color-secondary);
  }

  .ellipsis {
    flex: 1;
    width: 0;
    margin-right: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.cursor {
  cursor: pointer;
}
</style>
