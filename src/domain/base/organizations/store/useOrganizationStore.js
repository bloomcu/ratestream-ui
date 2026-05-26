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
        
        async update(slug = null) {
          const auth = useAuthStore()
          const currentSlug = slug || auth.organization
          const organization = { ...this.organization }
          delete organization.slug
          delete organization.rates_sync_key
          this.isLoading = true

          await OrganizationApi.update(currentSlug, organization)
            .then(response => {
              const organization = response.data.data

              this.organization = organization
              this.organizations = this.organizations.map(existingOrganization => {
                if (
                  existingOrganization.id === organization.id ||
                  existingOrganization.slug === currentSlug
                ) {
                  return organization
                }

                return existingOrganization
              })

              if (organization.slug && auth.organization === currentSlug) {
                auth.organization = organization.slug
              }

              if (
                organization.slug &&
                this.router.currentRoute.value.name === 'organizationsEdit' &&
                this.router.currentRoute.value.params.organization !== organization.slug
              ) {
                this.router.replace({
                  name: 'organizationsEdit',
                  params: { organization: organization.slug },
                })
              }

              this.isLoading = false
            }).catch(error => {
              this.isLoading = false
              console.log('Error', error.response.data)
            })
        },
        
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
