<script setup lang="ts">
import { type ViewUpdate, highlightActiveLine, lineNumbers, placeholder } from '@codemirror/view'
import { type CSSProperties, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import { bracketMatching } from '@codemirror/language'
import { minimalSetup, EditorView } from 'codemirror'
import { json } from '@codemirror/lang-json';
import cls from 'classnames'

const props = defineProps<{
  placeholder?: string | HTMLElement
  style?: CSSProperties
  modelValue?: string
  class?: string
}>()

const container = shallowRef<HTMLDivElement>()
const view = shallowRef<EditorView>()
const model = defineModel<string>()
const baseTheme = EditorView.theme({
  "&": {
    height: '100%'
  },
  "&.cm-focused": {
    outline: 'none'
  },
  ".cm-scroller": {
    padding: '6px',
    overflow: 'auto',
  },
  ".cm-gutters": {
    background: 'transparent',
    border: 'none',
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: 0,
    textAlign: 'center'
  }
}, { dark: false })

onMounted(() => {
  const extensions = [
    EditorView.lineWrapping,
    highlightActiveLine(),
    bracketMatching(),
    lineNumbers(),
    minimalSetup,
    json(),
    baseTheme,
    EditorView.updateListener.of((v: ViewUpdate) => {
      model.value = v.state.doc.toString()
    }),
  ]
  if (props.placeholder) {
    extensions.push(placeholder(props.placeholder))
  }

  view.value = new EditorView({
    parent: container.value,
    doc: props.modelValue,
    extensions,
  })
})

onBeforeUnmount(() => {
  if (view.value) {
    view.value.destroy()
  }
})

defineExpose({ name: 'VCodemirror' })
</script>

<template>
  <div ref="container" :style="props.style" :class="cls('v-codemirror', props.class)" />
</template>

<style lang="scss">
.v-codemirror {
  width: 100%;
  height: 100%;
}
</style>