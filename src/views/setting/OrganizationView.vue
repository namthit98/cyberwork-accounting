<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NDropdown,
  NIcon,
  NTag,
  useMessage
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import get from 'lodash.get'
import BaseListLayout from '@/components/layouts/BaseListLayout.vue'
import OrganizationFormModal from '@/components/setting/organization/OrganizationFormModal.vue'
import { h, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import uniq from 'lodash.uniq'
import { MoreOutlined } from '@vicons/antd'
import { useOrganizationStore } from '@/stores/OrganizationStore'
import type { IOrganizationTreeNode } from '@/types/organization'
import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import { DEFAULT_GUID, STATUS } from '@/const'
import { getStatusStringFromNumber } from '@/utils/helpers'
import { ACTION_KEY } from '@/types/common'

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
    width: 120,
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
    render(row) {
      const options = [
        {
          label: 'Sửa',
          key: ACTION_KEY.Edit
        }
      ]

      if (row.underOrganizationId) {
        options.push(
          ...[
            {
              label: 'Xoá',
              key: ACTION_KEY.Delete
            },

            {
              label:
                row.status === STATUS.ACTIVE ? 'Huỷ kích hoạt' : 'Kích hoạt',
              key: ACTION_KEY.UpdateStatus
            }
          ]
        )
      }
      return h(
        NDropdown,
        {
          options,
          onSelect: (key: ACTION_KEY) => selectHandler(key, row.id, row),
          trigger: 'click',
          placement: 'bottom-start'
        },
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
const message = useMessage()
const organizationStore = useOrganizationStore()
const formModalOpened = ref<boolean>(false)
const expandedKeys = ref<RowKey[]>([])

const expandRowHandler = (keys: RowKey[]) => {
  expandedKeys.value = keys
}

const selectHandler = async (
  key: ACTION_KEY,
  id: string,
  rowData: IOrganizationTreeNode
) => {
  try {
    if (key === ACTION_KEY.UpdateStatus) {
      await organizationStore.updateStatusOrganization(id, rowData.status)
    } else if (key === ACTION_KEY.Delete) {
      await organizationStore.deleteOrganization(id)
    } else if (key === ACTION_KEY.Edit) {
      router.push({ name: 'edit-organization', params: { id } })
    }
  } catch (err) {
    message.error(get(err, 'response.data.detail', 'Xoá đơn vị thất bại'))
  }
}

const searchHandler = (value: string) => {
  organizationStore.searchValue = value
}

const handleRoute = () => {
  if (['create', 'edit'].includes(route.meta.view)) {
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
  <base-list-layout
    :title="pageTitle"
    @primary="router.push({ name: 'create-organization' })"
    @search="searchHandler"
  >
    <organization-form-modal :show="formModalOpened" />
    <n-data-table
      :loading="organizationStore.isLoading"
      :columns="columns"
      :data="organizationStore.$organizationTree"
      :expanded-row-keys="expandedKeys"
      :scroll-x="1000"
      :rowKey="rowKey"
      :max-height="'calc(100vh - 190px)'"
      @update:expanded-row-keys="expandRowHandler($event)"
    />
  </base-list-layout>
</template>
