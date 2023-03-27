<script setup lang="ts">
import { useOrganizationStore } from '@/stores/OrganizationStore'
import type { ICreateOrganizationDto } from '@/types/organization'
import get from 'lodash.get'
import {
  NForm,
  NFormItem,
  NInput,
  NGrid,
  NGridItem,
  NSelect,
  NTreeSelect,
  NSpin,
  type FormInst,
  type FormValidationError,
  useMessage
} from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['close'])

const organizationLevelOptions = [
  { value: 'CONG_TY_CON', label: 'Công ty con' },
  { value: 'CHI_NHANH', label: 'Chi nhánh' },
  { value: 'VAN_PHONG_DAI_DIEN', label: 'Văn phòng đại diện' },
  { value: 'VAN_PHONG', label: 'Văn Phòng' },
  { value: 'TRUNG_TAM', label: 'Trung tâm' },
  { value: 'PHONG_BAN', label: 'Phòng ban' },
  { value: 'NHOM_TO_DOI', label: 'Nhóm/tổ/đội' },
  { value: 'PHAN_XUONG', label: 'Phân xưởng' }
]

const route = useRoute()
const organizationStore = useOrganizationStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const nameRef = ref<HTMLInputElement | null>(null)
const formValue = ref<ICreateOrganizationDto>({
  code: '',
  name: '',
  shortName: '',
  underOrganizationId: get(organizationStore, '$organizationTree.0.key', ''),
  organizationLevel: null,
  address: ''
})
const $isEdit = computed(() => route.meta.view === 'edit')

const rules = {
  code: {
    required: true,
    message: 'Nhập mã',
    trigger: ['input']
  },
  name: {
    required: true,
    message: 'Nhập tên đơn vị',
    trigger: ['input']
  },
  underOrganizationId: {
    required: true,
    message: 'Chọn bộ phận thuộc về',
    trigger: ['input']
  },
  organizationLevel: {
    required: true,
    message: 'Chọn cấp tổ chức',
    trigger: ['input']
  }
}

const submit = () => {
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        if ($isEdit.value) {
          edit()
        } else {
          create()
        }
      }
    }
  )
}

const create = async () => {
  try {
    await organizationStore.createOrganization(formValue.value)
    nameRef.value?.focus()
    emit('close')
  } catch (err) {
    message.error(get(err, 'response.data.detail', 'Tạo đơn vị thất bại'))
  }
}

const edit = async () => {
  if (!organizationStore.organization?.id) return

  try {
    await organizationStore.updateOrganization(
      organizationStore.organization.id,
      formValue.value
    )
    emit('close')
  } catch (err) {
    message.error(get(err, 'response.data.detail', 'Cập nhật đơn vị thất bại'))
  }
}

watch(
  () => organizationStore.organization,
  (newValue) => {
    if (!newValue) return

    formValue.value.code = newValue.code
    formValue.value.name = newValue.name
    formValue.value.shortName = newValue.shortName
    formValue.value.underOrganizationId = newValue.underOrganizationId
    formValue.value.organizationLevel = newValue.organizationLevel
    formValue.value.address = newValue.address
  }
)

defineExpose({ submit })
</script>

<template>
  <n-form ref="formRef" :model="formValue" :rules="rules">
    <n-spin :show="organizationStore.isFormLoading">
      <n-grid cols="3" x-gap="12">
        <n-grid-item span="2">
          <n-form-item style="flex: 1" label="Tên đơn vị" path="name">
            <n-input
              ref="nameRef"
              v-model:value="formValue.name"
              placeholder="Nhập tên đơn vị"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item label="Mã đơn vị" path="code">
            <n-input
              v-model:value="formValue.code"
              :disabled="$isEdit"
              placeholder="Mã đơn vị"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="3">
          <n-form-item label="Tên viết tắt" path="shortName">
            <n-input
              v-model:value="formValue.shortName"
              placeholder="Tên viết tắt"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="3">
          <n-form-item label="Thuộc bộ phận" path="underOrganizationId">
            <n-tree-select
              :options="organizationStore.$organizationTree"
              :disabled="$isEdit"
              v-model:value="formValue.underOrganizationId"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="3">
          <n-form-item label="Cấp tổ chức" path="organizationLevel">
            <n-select
              v-model:value="formValue.organizationLevel"
              :options="organizationLevelOptions"
              :disabled="$isEdit"
              placeholder="Cấp tổ chức"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="3">
          <n-form-item label="Địa chỉ" path="address">
            <n-input
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 3
              }"
              v-model:value="formValue.address"
              placeholder="Địa chỉ"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-spin>
  </n-form>
</template>
