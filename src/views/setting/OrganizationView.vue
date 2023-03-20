<script setup lang="ts">
import { NButton, NDataTable, NDropdown, NIcon, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppListLayout from '@/components/layouts/AppListLayout.vue'
import OrganizationFormModal from '@/components/setting/organization/OrganizationFormModal.vue'
import { h, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import uniq from 'lodash.uniq'
import { MoreOutlined } from '@vicons/antd'
import { useOrganizationStore } from '@/store/OrganizationStore'
import type { IOrganizationTreeNode } from '@/types/Organization'
import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import { DEFAULT_GUID, STATUS } from '@/const'
import { getStatusStringFromNumber } from '@/utils/helpers'

const options = [
  {
    label: 'Xoá',
    key: '1'
  },
  {
    label: 'Sửa',
    key: '2'
  }
]
const pageTitle = 'Cơ cấu tổ chức'

const columns: DataTableColumns<IOrganizationTreeNode> = [
  {
    key: 'name',
    title: 'name',
    width: 400
  },
  {
    key: 'code',
    title: 'Mã',
    width: 150
  },
  {
    key: 'shortName',
    title: 'Tên viết tắt',
    width: 150
  },
  {
    key: 'organizationLevel',
    title: 'Cấp tổ chức',
    width: 200
  },
  {
    key: 'status',
    title: 'Trạng thái',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.status === STATUS.ACTIVE ? 'success' : 'default',
          bordered: false
        },
        {
          default: () => getStatusStringFromNumber(row.status)
        }
      )
    }
  },
  {
    title: '',
    key: 'action',
    width: 40,
    fixed: 'right',
    render() {
      return h(
        NDropdown,
        { options, trigger: 'click', placement: 'bottom-start' },
        () => [
          h(NButton, { quaternary: true, circle: true, type: 'info' }, () => [
            h(NIcon, { size: 24, component: MoreOutlined })
          ])
        ]
      )
    }
  }
]
const rowKey = (row: IOrganizationTreeNode) => row.id

const router = useRouter()
const route = useRoute()
const organizationStore = useOrganizationStore()
const formModalOpened = ref<boolean>(false)
const expandedKeys = ref<RowKey[]>([])

const expandRowHandler = (keys: RowKey[]) => {
  expandedKeys.value = keys
}

const handleRoute = () => {
  if (route.meta.view === 'create') {
    formModalOpened.value = true
  } else {
    formModalOpened.value = false
  }
}

watch(
  () => route.meta.view,
  () => {
    handleRoute()
  }
)

onMounted(() => {
  handleRoute()
})

onMounted(async () => {
  await organizationStore.fetchOrganizations()
  expandedKeys.value = uniq(
    organizationStore.organizations.map((org) => org.underOrganizationId)
  ).filter((x) => x !== DEFAULT_GUID)
})
</script>

<template>
  <app-list-layout
    :title="pageTitle"
    @primary="router.push({ name: 'create-organization' })"
  >
    <organization-form-modal :show="formModalOpened" />
    <n-data-table
      :loading="organizationStore.isLoading"
      :columns="columns"
      :data="organizationStore.$organizationTree"
      :expanded-row-keys="expandedKeys"
      :scroll-x="1000"
      :rowKey="rowKey"
      @update:expanded-row-keys="expandRowHandler($event)"
    />
  </app-list-layout>
</template>
