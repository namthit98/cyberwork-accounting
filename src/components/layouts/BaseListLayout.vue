<script setup lang="ts">
import { NH2, NPageHeader, NButton, NDropdown, NIcon, NInput } from 'naive-ui'
import { MoreOutlined, SearchOutlined } from '@vicons/antd'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{
  title: string
}>()
const emit = defineEmits(['primary', 'search'])

const options = [
  {
    label: 'Nhập dữ liệu',
    key: '1'
  }
]

const searchValue = ref<string>('')

watchDebounced(
  searchValue,
  () => {
    emit('search', searchValue.value)
  },
  { debounce: 500, maxWait: 5000 }
)
</script>

<template>
  <div class="px-5 py-3">
    <n-page-header class="mb-5">
      <template #title>
        <n-h2 class="m-0">{{ props.title }}</n-h2>
      </template>
      <template #extra>
        <div class="flex items-center">
          <n-input
            clearable
            v-model:value="searchValue"
            class="mr-2"
            placeholder="Nhập từ khoá tìm kiếm"
          >
            <template #prefix>
              <n-icon :component="SearchOutlined" />
            </template>
          </n-input>
          <n-button type="primary" class="mr-1" @click="emit('primary')"
            >Thêm mới</n-button
          >
          <n-dropdown
            trigger="click"
            :options="options"
            placement="bottom-start"
          >
            <n-button quaternary circle type="info">
              <n-icon size="32" :component="MoreOutlined" />
            </n-button>
          </n-dropdown>
        </div>
      </template>
    </n-page-header>
    <slot />
  </div>
</template>
