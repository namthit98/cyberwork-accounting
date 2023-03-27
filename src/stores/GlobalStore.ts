import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('GlobalStore', () => {
  const currentOrganization = ref<string>('')

  return {
    currentOrganization
  }
})
