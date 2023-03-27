<script setup lang="ts">
import BaseModalLayout from '@/components/layouts/BaseModalLayout.vue'
import OrganizationForm from '@/components/setting/organization/OrganizationForm.vue'
import { useOrganizationStore } from '@/stores/OrganizationStore'
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  show: boolean
}>()

const route = useRoute()
const router = useRouter()
const organizationStore = useOrganizationStore()
const organizationForm = ref<InstanceType<typeof OrganizationForm> | null>(null)
const $isEdit = computed(() => route.meta.view === 'edit')
const $title = computed(() =>
  $isEdit.value ? 'Chỉnh sửa đơn vị' : 'Thêm đơn vị'
)

const saveHandler = () => organizationForm.value?.submit()

watch(
  () => route.params.id,
  (newValue) => {
    if (!newValue) {
      organizationStore.organization = null
    }

    if (newValue && typeof newValue === 'string') {
      organizationStore.fetchOrganization(newValue)
    }
  }
)

onMounted(() => {
  if (route.params.id && typeof route.params.id === 'string') {
    organizationStore.fetchOrganization(route.params.id)
  }
})
</script>

<template>
  <base-modal-layout
    :title="$title"
    :show="props.show"
    :loading="organizationStore.isFormLoading"
    :canCreateMore="!$isEdit"
    @close="router.push({ name: 'organizations' })"
    @save="saveHandler"
    v-slot="slotProps"
  >
    <organization-form
      ref="organizationForm"
      @close="!slotProps.isCreateMore && router.push({ name: 'organizations' })"
    />
  </base-modal-layout>
</template>
