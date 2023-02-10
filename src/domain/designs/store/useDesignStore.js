import { defineStore, acceptHMRUpdate } from 'pinia'
import { designApi as DesignApi } from '@/domain/designs/api/designApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useDesignStore = defineStore('designStore', {
    state: () => ({
        designs: null,
        design: null,
        isLoading: true,
        createModalOpen: false,
    }),
    
    getters: {
      variables: (state) => state.design.variables
    },
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.designs = null
          
          DesignApi.index(auth.organization, params)
            .then(response => {
              this.designs = response.data.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(design) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await DesignApi.store(auth.organization, design)
            .then(response => {
              this.designs.unshift(response.data.data)
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        show(uuid) {
          const auth = useAuthStore()
          this.isLoading = true
          
          DesignApi.show(auth.organization, uuid)
            .then(response => {
              this.design = response.data.data
              this.isLoading = false
            })
        },
        
        update() {
          const auth = useAuthStore()
          this.isLoading = true
          
          DesignApi.update(auth.organization, this.design.uuid, this.design)
            .then(response => {
              console.log('Design successfully updated')
              this.isLoading = false
            })
        },
        
        destroy(uuid) {
          const auth = useAuthStore()
          this.isLoading = true
          
          DesignApi.destroy(auth.organization, uuid)
            .then(response => {
              this.designs = this.designs.filter((design) => design.uuid !== uuid)
              this.isLoading = false
            })
        },
        
        toggleCreateModal() {
          this.createModalOpen = !this.createModalOpen
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesignStore, import.meta.hot))
}
