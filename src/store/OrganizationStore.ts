import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  ICreateOrganizationDto,
  IOrganizationDto,
  IOrganizationTreeNode
} from '@/types/Organization'
import { organizationApi } from '@/apis/OrganizationApi'
import arrayToTree from '@/utils/array-to-tree'
import { DEFAULT_GUID } from '@/const'

export const useOrganizationStore = defineStore('OrganizationStore', () => {
  const isLoading = ref<boolean>(false)
  const isCreateLoading = ref<boolean>(false)
  const organizations = ref<IOrganizationDto[]>([])

  const $organizationTree = computed(() => {
    if (!organizations.value.length) return []

    const processedOrg: IOrganizationTreeNode[] = organizations.value.map(
      (org) => ({
        ...org,
        underOrganizationId:
          org.underOrganizationId === DEFAULT_GUID
            ? ''
            : org.underOrganizationId,
        key: org.id,
        label: org.name
      })
    )

    return arrayToTree<IOrganizationTreeNode>(
      processedOrg,
      'underOrganizationId'
    )
  })

  const fetchOrganizations = async () => {
    isLoading.value = true
    organizations.value = await organizationApi.fetchAllOrganizations()
    isLoading.value = false
  }

  const createOrganization = async (organization: ICreateOrganizationDto) => {
    const result = await organizationApi.createOrganization(organization)

    if (result) {
      fetchOrganizations()
    }
  }

  return {
    isLoading,
    isCreateLoading,
    organizations,
    $organizationTree,
    createOrganization,
    fetchOrganizations
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot))
}
