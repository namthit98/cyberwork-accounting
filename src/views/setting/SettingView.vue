<script setup lang="ts">
import { NGrid, NGridItem, NCard, NText } from 'naive-ui'
import { useRouter } from 'vue-router'
import BaseListLayout from '@/components/layouts/BaseListLayout.vue'

const router = useRouter()

const pageTitle = 'Hệ thống'
const items = [
  { key: 'company-info', label: 'Thông tin công ty' },
  { key: 'organizations', label: 'Cơ cấu tổ chức' },
  { key: 'roles', label: 'Vai trò' },
  { key: 'users', label: 'Tài khoản' }
]
</script>

<template>
  <base-list-layout :title="pageTitle">
    <n-grid
      cols="2 s:3 m:4 l:5 xl:6 2xl:7"
      responsive="screen"
      :x-gap="24"
      :y-gap="24"
    >
      <n-grid-item :key="item.key" v-for="item in items">
        <n-card
          hoverable
          class="cursor-pointer text-center"
          @click="router.push(`/setting/${item.key}`)"
        >
          <n-text>{{ item.label }}</n-text>
        </n-card>
      </n-grid-item>
    </n-grid>
  </base-list-layout>
</template>
