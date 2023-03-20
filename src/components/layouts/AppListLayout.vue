<script setup lang="ts">
import { NH2, NPageHeader, NSpace, NButton, NDropdown, NIcon } from 'naive-ui'
import { MoreOutlined } from '@vicons/antd'

const props = defineProps<{
  title: string
}>()
const emit = defineEmits(['primary'])

const options = [
  {
    label: 'Nhập dữ liệu',
    key: '1'
  }
]
</script>

<template>
  <div class="px-5 py-3">
    <n-page-header class="mb-5">
      <template #title>
        <n-h2 class="m-0">{{ props.title }}</n-h2>
      </template>
      <template #extra>
        <n-space align="center">
          <n-button type="primary" @click="emit('primary')">Thêm mới</n-button>
          <n-dropdown
            trigger="click"
            :options="options"
            placement="bottom-start"
          >
            <n-button quaternary circle type="info">
              <n-icon size="32" :component="MoreOutlined" />
            </n-button>
          </n-dropdown>
        </n-space>
      </template>
    </n-page-header>
    <slot />
  </div>
</template>
