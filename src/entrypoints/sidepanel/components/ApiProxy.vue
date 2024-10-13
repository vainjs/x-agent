<script setup lang="ts">
import { type InterceptRule, } from '@/type';
import { ref } from 'vue';
import { saveRules, getRules, DEFAULT_RULE, VALIDATION_RULES } from '@/utils/api-proxy';
import Codemirror from './VuetifyCodemirror.vue'

const formState = ref<InterceptRule>({ ...DEFAULT_RULE });
const rules = ref<InterceptRule[]>([]);
const dialog = ref(false);
const form = ref();

onMounted(async () => {
  rules.value = await getRules()
});

const closeDialog = () => {
  dialog.value = false;
};

const addRule = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const newRule: InterceptRule = {
    enabled: true,
    pattern: formState.value.pattern,
    response: {
      data: JSON.parse(formState.value.response.data),
      status: formState.value.response.status,
    }
  };
  rules.value.push(newRule);
  saveRules(rules.value)
  formState.value = { ...DEFAULT_RULE };
  closeDialog();
}

const deleteRule = async (index: number) => {
  const confirmed = confirm('确认删除该规则？');
  if (confirmed) {
    rules.value.splice(index, 1);
  }
};

const toggleRule = async (index: number) => {
  rules.value[index].enabled = !rules.value[index].enabled;
};

watchEffect(() => {
  console.log('formState', toRaw(dialog.value), toRaw(formState.value))
})
</script>

<template>
  <div :class="$style.container">
    <div class="d-flex justify-end mb-4">
      <v-btn icon="mdi-plus" color="primary" variant="tonal" density="comfortable" @click="dialog = true" />
    </div>

    <v-list>
      <v-list-item v-for="(rule, index) in rules" :key="rule.pattern" :title="rule.pattern">
        <template v-slot:append>
          <v-switch v-model="rule.enabled" density="compact" hide-details @change="() => toggleRule(index)" />
          <v-btn icon="mdi-delete" variant="text" color="error" density="compact" class="ml-2"
            @click="deleteRule(index)" />
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          添加规则
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>

        <v-form ref="form" @submit.prevent="addRule">
          <v-card-text>
            <v-text-field v-model="formState.pattern" label="匹配规则（支持正则表达式）" :rules="VALIDATION_RULES.pattern" required
              validate-on="input" clearable />
            <v-text-field v-model.number="formState.response.status" label="状态码 (100-599)" type="number"
              :rules="VALIDATION_RULES.status" required validate-on="input" />
            <Codemirror v-model="formState.response.data" label="响应数据" :rules="VALIDATION_RULES.responseData" />
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="error" variant="tonal" flat @click="closeDialog">
              取消
            </v-btn>
            <v-btn color="primary" type="submit" variant="flat" class="ml-2" flat>
              确定
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 16px;
}
</style>
