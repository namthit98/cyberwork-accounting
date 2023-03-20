<script setup lang="ts">
import { useOrganizationStore } from '@/store/OrganizationStore'
import type { ICreateOrganizationDto } from '@/types/Organization'
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
import { ref } from 'vue'

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

const organizationStore = useOrganizationStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<ICreateOrganizationDto>({
  code: '',
  name: '',
  shortName: '',
  underOrganizationId: get(organizationStore, '$organizationTree.0.key', ''),
  organizationLevel: null,
  address: ''
})
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
        organizationStore.$patch({
          isCreateLoading: true
        })

        try {
          await organizationStore.createOrganization(formValue.value)
          emit('close')
        } catch (err) {
          message.error(get(err, 'response.data.detail', 'Tạo đơn vị thất bại'))
        }

        organizationStore.$patch({
          isCreateLoading: false
        })
      } else {
        console.log(errors)
      }
    }
  )
}

defineExpose({ submit })
</script>

<template>
  <n-form ref="formRef" :model="formValue" :rules="rules">
    <n-spin :show="organizationStore.isCreateLoading">
      <n-grid cols="3" x-gap="12">
        <n-grid-item span="2">
          <n-form-item style="flex: 1" label="Tên đơn vị" path="name">
            <n-input
              v-model:value="formValue.name"
              placeholder="Nhập tên đơn vị"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item label="Mã đơn vị" path="code">
            <n-input v-model:value="formValue.code" placeholder="Mã đơn vị" />
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
              v-model:value="formValue.underOrganizationId"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="3">
          <n-form-item label="Cấp tổ chức" path="organizationLevel">
            <n-select
              v-model:value="formValue.organizationLevel"
              :options="organizationLevelOptions"
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
