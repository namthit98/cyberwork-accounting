<script setup lang="ts">
import AppModalLayout from '@/components/layouts/AppModalLayout.vue'
import OrganizationForm from '@/components/setting/organization/OrganizationForm.vue'
import { useOrganizationStore } from '@/store/OrganizationStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  show: boolean
}>()
const title = 'Thêm đơn vị'

const router = useRouter()
const organizationStore = useOrganizationStore()
const organizationForm = ref<InstanceType<typeof OrganizationForm> | null>(null)

const saveHandler = () => organizationForm.value?.submit()
</script>

<template>
  <app-modal-layout
    :title="title"
    :show="props.show"
    :loading="organizationStore.isCreateLoading"
    @close="router.push({ name: 'organizations' })"
    @save="saveHandler"
    v-slot="slotProps"
  >
    <organization-form
      ref="organizationForm"
      @close="!slotProps.isCreateMore && router.push({ name: 'organizations' })"
    />
  </app-modal-layout>
</template>
