<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section :class="$style.container">
    <main :class="$style.main">
      <RouterView />
    </main>
    <aside :class="$style.aside">
      <v-tabs color="primary" direction="vertical">
        <v-tab min-width="auto" to="/" exact>
          <v-icon icon="mdi-language-javascript" size="x-large" />
        </v-tab>
        <v-tab min-width="auto" to="/api">
          <v-icon icon="mdi-lock" size="x-large" />
        </v-tab>
      </v-tabs>
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
  border-radius: 12px;
  background: #fff;
}

.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 4px;
}
</style>
