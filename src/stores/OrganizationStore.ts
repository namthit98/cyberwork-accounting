import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  ICreateOrganizationDto,
  IOrganizationDto,
  IOrganizationTreeNode,
  IUpdateOrganizationDto
} from '@/types/organization'
import { organizationApi } from '@/apis/OrganizationApi'
import arrayToTree from '@/utils/array-to-tree'
import { DEFAULT_GUID } from '@/const'
import { useGlobalStore } from '@/stores/GlobalStore'
import { Status } from '@/types/common'

export const useOrganizationStore = defineStore('OrganizationStore', () => {
  const globalStore = useGlobalStore()
  const isLoading = ref<boolean>(false)
  const isFormLoading = ref<boolean>(false)
  const organizations = ref<IOrganizationDto[]>([])
  const organization = ref<IOrganizationDto | null>(null)
  const searchValue = ref<string>('')

  const $filterdOrganizations = computed(() => {
    if (!organizations.value.length) return []

    const result = organizations.value.filter((org) => {
      const isMatched = org.name
        .toLowerCase()
        .includes(searchValue.value.toLowerCase())
      return isMatched
    })

    return result
  })

  const $organizationTree = computed(() => {
    if (!organizations.value.length) return []

    const processedOrg: IOrganizationTreeNode[] =
      $filterdOrganizations.value.map((org) => ({
        ...org,
        underOrganizationId:
          org.underOrganizationId === DEFAULT_GUID
            ? ''
            : org.underOrganizationId,
        key: org.id,
        label: org.name
      }))

    const treeData = arrayToTree<IOrganizationTreeNode>(
      processedOrg,
      'underOrganizationId'
    )

    return treeData
  })

  const deleteOrganization = async (id: string) => {
    const result = await organizationApi.deleteOrganization(id)
    const deletedIndex = organizations.value.findIndex(
      (org) => org.id === result
    )
    organizations.value.splice(deletedIndex, 1)
  }

  const fetchOrganizations = async () => {
    isLoading.value = true
    organizations.value = await organizationApi.fetchAllOrganizations()
    const rootOrg = organizations.value.find(
      (org) => org.underOrganizationId === DEFAULT_GUID
    )
    if (rootOrg) {
      globalStore.currentOrganization = rootOrg.id
    }
    isLoading.value = false
  }

  const fetchOrganization = async (id: string) => {
    isLoading.value = true

    organization.value = await organizationApi.fetchOrganization(id)

    isLoading.value = false
  }

  const createOrganization = async (organization: ICreateOrganizationDto) => {
    isFormLoading.value = true

    const result = await organizationApi.createOrganization(organization)

    isFormLoading.value = false

    if (result) {
      fetchOrganizations()
    }
  }

  const updateStatusOrganization = async (id: string, status: number) => {
    const newStatus =
      status === Status.Inactive ? Status.Active : Status.Inactive
    const result = await organizationApi.updateStatusOrganization(id, newStatus)
    organizations.value.forEach((org) => {
      if (org.id === result) {
        org.status = newStatus
      }
    })
  }

  const updateOrganization = async (
    id: string,
    organization: IUpdateOrganizationDto
  ) => {
    const result = await organizationApi.updateOrganization(id, organization)

    if (result) {
      fetchOrganizations()
    }
  }

  return {
    isLoading,
    isFormLoading,
    searchValue,
    organizations,
    organization,
    $filterdOrganizations,
    $organizationTree,
    createOrganization,
    fetchOrganizations,
    fetchOrganization,
    updateOrganization,
    updateStatusOrganization,
    deleteOrganization
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot))
}
