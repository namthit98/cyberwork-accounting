<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
</script>

<template>
  <main>
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary" class="bg-yellow-500 text-red-500"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </main>
</template>
