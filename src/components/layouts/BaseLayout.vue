<script setup lang="ts">
import {
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NTreeSelect,
  NAvatar,
  NText,
  NIcon,
  NBadge,
  NDropdown,
  NPopover,
  NH2,
  NList,
  NListItem,
  NThing
} from 'naive-ui'
import {
  DashboardOutlined,
  BellOutlined,
  LogoutOutlined,
  FullscreenOutlined
} from '@vicons/antd'
import renderIcon from '@/utils/render-icon'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { useOrganizationStore } from '@/stores/OrganizationStore'
import { useGlobalStore } from '@/stores/GlobalStore'

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'dashboard'
          }
        },
        { default: () => 'Dashboard' }
      ),
    key: 'dashboard',
    icon: renderIcon(DashboardOutlined)
  },

  {
    label: 'Cash',
    key: 'cash',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Banking',
    key: 'banking',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Purchase',
    key: 'purchase',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Sales',
    key: 'sales',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Invoice Managing',
    key: 'invoice-managing',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Inventory',
    key: 'inventory',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Equipments',
    key: 'equipments',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Fixed Assets',
    key: 'fixed-assets',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Payroll',
    key: 'Tax',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Cost of Production',
    key: 'cost-of-production',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'General',
    key: 'general',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Budget',
    key: 'budget',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Report',
    key: 'report',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Financial Analysis',
    key: 'financial-analysis',
    icon: renderIcon(DashboardOutlined)
  },
  {
    key: 'divider',
    type: 'divider'
  },
  {
    label: 'Category',
    key: 'category',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'Opening Balance',
    key: 'opening-balance',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'setting'
          }
        },
        { default: () => 'Setting' }
      ),
    key: 'setting',
    icon: renderIcon(DashboardOutlined)
  }
]

const globalStore = useGlobalStore()
const organizationStore = useOrganizationStore()

const updateOrganizationHandler = (key: string) => {
  globalStore.currentOrganization = key
}
const handleSelect = (key: string) => {
  console.log(key)
}
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header
        bordered
        class="flex h-14 items-center justify-between px-2"
      >
        <n-h2 class="mb-0 text-[#18a058]" :type="'success'"
          >CyberWork Accounting</n-h2
        >
        <n-space class="self-stretch" size="small">
          <n-space :align="'center'" class="h-full">
            <n-tree-select
              class="w-80"
              filterable
              :options="organizationStore.$organizationTree"
              :value="globalStore.currentOrganization"
              @update:value="updateOrganizationHandler"
            />
          </n-space>

          <n-space
            :align="'center'"
            class="h-full cursor-pointer px-3 hover:bg-[#f6f6f6]"
          >
            <n-icon
              class="mt-1"
              color="black"
              size="24"
              :component="FullscreenOutlined"
            ></n-icon>
          </n-space>

          <n-popover placement="bottom-end" trigger="click">
            <template #trigger>
              <n-space
                :align="'center'"
                class="h-full cursor-pointer px-3 hover:bg-[#f6f6f6]"
              >
                <n-badge value="9+">
                  <n-icon
                    color="black"
                    size="24"
                    :component="BellOutlined"
                  ></n-icon>
                </n-badge>
              </n-space>
            </template>
            <n-list class="w-96" clickable hoverable>
              <template #header>
                <n-h2 class="mb-0">Thông báo</n-h2>
              </template>
              <template #footer>
                <n-space justify="center" class="cursor-pointer">
                  <n-text type="info"> Xem tất cả </n-text>
                </n-space>
              </template>
              <n-list-item>
                <n-thing description="">
                  <template #description>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Laudantium adipisci illum totam eum praesentium, dolore
                      molestiae et quo?
                    </p>
                  </template>
                </n-thing>
              </n-list-item>

              <n-list-item>
                <n-thing description="">
                  <template #description>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Laudantium adipisci illum totam eum praesentium, dolore
                      molestiae et quo?
                    </p>
                  </template>
                </n-thing>
              </n-list-item>

              <n-list-item>
                <n-thing description="">
                  <template #description>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Laudantium adipisci illum totam eum praesentium, dolore
                      molestiae et quo?
                    </p>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </n-popover>

          <n-dropdown
            trigger="click"
            :options="[
              {
                label: 'Đăng xuất',
                key: 'logout',
                icon: renderIcon(LogoutOutlined)
              }
            ]"
            @select="handleSelect"
          >
            <n-space
              :align="'center'"
              class="h-full cursor-pointer px-3 hover:bg-[#f6f6f6]"
            >
              <n-avatar
                round
                object-fit="cover"
                size="small"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                class="mt-1"
              />
              <n-text strong> NamTH </n-text>
            </n-space>
          </n-dropdown>
        </n-space>
      </n-layout-header>
      <n-layout has-sider class="h-[calc(100vh-56px)]">
        <n-layout-sider
          inverted
          bordered
          show-trigger="arrow-circle"
          collapse-mode="width"
          class="pt-1"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
        >
          <n-menu
            inverted
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout-content class="bg-neutral-100">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>
