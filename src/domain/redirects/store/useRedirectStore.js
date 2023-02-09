import { defineStore, acceptHMRUpdate } from 'pinia'
import { redirectApi as RedirectApi } from '@/domain/redirects/api/redirectApi'

import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const useRedirectStore = defineStore('redirectStore', {
    state: () => ({
        redirects: [],
        redirect: {},
        isLoading: false,
    }),
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.redirects = []
          
          RedirectApi.index(auth.organization, params)
            .then(response => {
              this.redirects = response.data.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(redirect) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await RedirectApi.store(auth.organization, redirect)
            .then(response => {
              this.redirects.unshift(response.data.data)
            })
            .catch((error) => {
              return Promise.reject(error)
            })
        },
        
        async show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          this.redirect = {}
          
          await RedirectApi.show(auth.organization, id)
            .then(response => {
              this.redirect = response.data.data
              this.isLoading = false
            })
        },
        
        async update(id, properties) {
          const auth = useAuthStore()
          
          await RedirectApi.update(auth.organization, id, properties)
            .then(response => {
              console.log('Redirect successfully updated')
            })
        },
        
        async destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await RedirectApi.destroy(auth.organization, id)
            .then(response => {
              this.redirects = this.redirects.filter((redirect) => redirect.id !== id)
              this.isLoading = false
            })
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRedirectStore, import.meta.hot))
}
