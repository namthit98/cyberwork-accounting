<script setup lang="ts">
import { NModal, NH2, NSpace, NButton, NSwitch, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  loading: boolean
}>()
const emit = defineEmits(['close', 'save'])
const isCreateMore = ref<boolean>(false)
</script>

<template>
  <n-modal
    transform-origin="center"
    :closable="false"
    preset="card"
    class="w-9/12 md:w-7/12 lg:w-[600px]"
    @update-show="!props.loading && emit('close', $event)"
  >
    <template #header>
      <n-h2 class="mb-0">{{ props.title }}</n-h2>
    </template>
    <slot :isCreateMore="isCreateMore" />
    <template #footer>
      <n-space justify="space-between">
        <n-button
          :disabled="props.loading"
          type="error"
          quaternary
          @click="emit('close', false)"
          >Huỷ</n-button
        >
        <n-space align="center">
          <n-switch :disabled="props.loading" v-model:value="isCreateMore" />
          <n-text>tạo thêm dữ liệu khác</n-text>
          <n-button
            :disabled="props.loading"
            type="primary"
            @click="emit('save')"
            >Lưu</n-button
          >
        </n-space>
      </n-space>
    </template>
  </n-modal>
</template>
