<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
