<script setup lang="ts">
import { CodeIcon, Fullscreen1Icon } from 'tdesign-icons-vue-next'
import { RouterView } from 'vue-router'
import { EVENT_MESSAGE_ACTION } from '@/enum'

const menuItems = [
  {
    label: i18n.t('staticResources'),
    icon: CodeIcon,
    key: '/'
  }
  // {
  //   key: '/api',
  //   icon: InternetIcon,
  //   label: 'API'
  // }
]

const openWindow = () => {
  // @ts-ignore
  browser.runtime.sendMessage({ action: EVENT_MESSAGE_ACTION.CLOSE_SIDE_PANEL })
}
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
        <template #logo>
          <div :class="$style.fullscreen">
            <t-button
              @click="openWindow"
              shape="circle"
              variant="text"
            >
              <template #icon>
                <Fullscreen1Icon size="24px" />
              </template>
            </t-button>
          </div>
        </template>
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
.container {
  display: flex;
  height: 100%;
  padding: 4px 0 4px 4px;
}

.main {
  flex: 1;
  width: 0;
  padding: 12px 0;
  border-radius: 12px;
  background: #fff;
}

.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .fullscreen {
    margin: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .menu {
    background: #f3f3f3;
  }
}
</style>
