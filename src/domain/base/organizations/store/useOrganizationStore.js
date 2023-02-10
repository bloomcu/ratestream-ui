import { defineStore, acceptHMRUpdate } from 'pinia'
import { organizationApi as OrganizationApi } from '@/domain/base/organizations/api/organizationApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useOrganizationStore = defineStore('organizationStore', {
    state: () => ({
        organizations: [],
        organization: null,
        isLoading: true,
        createModalOpen: false,
    }),
    
    getters: {},
    
    actions: {
        index(params) {
          this.organizations = []
          OrganizationApi.index(params)
            .then(response => {
              this.organizations = response.data.data
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(organization) {
          await OrganizationApi.store(organization)
            .then(response => {
              this.organizations.unshift(response.data.data)
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async show() {
          const auth = useAuthStore()
          this.isLoading = true
          this.organization = null
          
          await OrganizationApi.show(auth.organization)
            .then(response => {
              this.organization = response.data.data
              this.isLoading = false
            })
        },
        
        update() {},
        
        destroy(id) {},
        
        toggleCreateModal() {
          this.createModalOpen = !this.createModalOpen
        }
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrganizationStore, import.meta.hot))
}
