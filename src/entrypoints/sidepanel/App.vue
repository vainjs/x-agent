<script setup lang="ts">
import { CodeIcon, InternetIcon } from 'tdesign-icons-vue-next'
import { RouterView } from 'vue-router'

const menuItems = [
  {
    key: '/',
    icon: CodeIcon,
    label: '静态资源'
  },
  // {
  //   key: '/api',
  //   icon: InternetIcon,
  //   label: 'API'
  // }
]
</script>

<template>
  <section :class="$style.container">
    <main :class="$style.main">
      <RouterView />
    </main>
    <aside :class="$style.aside">
      <t-menu
        :default-value="menuItems[0].key"
        :width="['200px', '50px']"
        :class="$style.menu"
        theme="light"
        collapsed
      >
        <t-menu-item
          v-for="item in menuItems"
          :value="item.key"
          :key="item.key"
          :to="item.key"
        >
          <template #icon>
            <component
              :is="item.icon"
              size="24px"
            />
          </template>
          {{ item.label }}
        </t-menu-item>
      </t-menu>
    </aside>
  </section>
</template>

<style lang="scss" module>
$background: #f3f3f3;

.container {
  display: flex;
  height: 100%;
  padding: 4px 0 4px 4px;
  background: $background;
}

.main {
  flex: 1;
  width: 0;
  padding: 16px 0;
  border-radius: 12px;
  background: #fff;
}

.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .menu {
    background: $background;
  }
}
</style>
