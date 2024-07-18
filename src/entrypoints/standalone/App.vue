<script setup lang="ts">
import { CodeIcon, FullscreenExit1Icon } from 'tdesign-icons-vue-next'
import { RouterView } from 'vue-router'
import { EVENT_MESSAGE_ACTION } from '@/enum'

const menuItems = [
  {
    label: i18n.t('staticResources'),
    icon: CodeIcon,
    key: '/'
  }
]

const closeWindow = () => {
  browser.runtime.sendMessage({ action: EVENT_MESSAGE_ACTION.OPEN_SIDE_PANEL })
}
</script>

<template>
  <section :class="$style.container">
    <aside :class="$style.aside">
      <t-menu :default-value="menuItems[0].key" :width="['200px', '50px']" :class="$style.menu" theme="light">
        <template #logo>
          <div :class="$style.banner">
            <h1 :class="$style.title">{{ browser.runtime.getManifest().name }}</h1>
            <t-button shape="circle" variant="text" @click="closeWindow">
              <template #icon>
                <FullscreenExit1Icon size="24px" />
              </template>
            </t-button>
          </div>
        </template>
        <t-menu-item v-for="item in menuItems" :value="item.key" :key="item.key" :to="item.key">
          <template #icon>
            <component :is="item.icon" size="24px" />
          </template>
          {{ item.label }}
        </t-menu-item>
      </t-menu>
    </aside>
    <main :class="$style.main">
      <RouterView />
    </main>
  </section>
</template>

<style lang="scss" module>
.container {
  display: flex;
  gap: 12px;
  height: 100%;
}

.main {
  flex: 1;
  width: 0;
  padding: 12px 6px;
  background: #fff;
}

.aside {
  display: flex;
  flex-direction: column;

  .title {
    font-size: 16px;
  }

  .banner {
    margin: 0 !important;
    padding: 0 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
