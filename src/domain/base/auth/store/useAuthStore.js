import { defineStore, acceptHMRUpdate } from 'pinia'
import { authApi as AuthApi } from '@/domain/base/auth/api/authApi'

// We now get the current route in all stores.
// Use the this.router.currentRoute to get the site.

export const useAuthStore = defineStore('authStore', {
    state: () => ({
      // TODO: Rename this property as "auth"
      user: JSON.parse(localStorage.getItem('user')),
      organization: 'bloomcu',
    }),
    
    getters: {
      isAdmin: (state) => state.user.role === 'admin',
      isEditor: (state) => state.user.role === 'editor',
    },
    
    actions: {
      async login(email, password) {
        await AuthApi.login(email, password)
          .then(response => {      
            // TODO: Do I need to do this if we set the organization in httpClient? No.
            this.organization = response.data.data.organization.slug
            this.user = response.data.data
            localStorage.setItem('user', JSON.stringify(response.data.data))
            
            this.router.push({ name: 'organizations' })
          })
          .catch(error => {})
      },
      
      async logout() {
        localStorage.removeItem('user');
        
        await AuthApi.logout()
          .then(response => {
            this.user = null
            this.router.push({ name: 'login' })
          })
          .catch(error => {})
      },
      
      async register(name, email, password, password_confirmation) {
        await AuthApi.register(name, email, password, password_confirmation)
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            this.user = response.data.data
            
            // TODO: The next step for user will be to setup their organization
            // this.router.push({ name: 'onboardOrganization' })
          })
          .catch(error => {})
      },
      
      async registerWithInvitation(invitation_uuid, name, email, password, password_confirmation) {
        await AuthApi.registerWithInvitation(invitation_uuid, name, email, password, password_confirmation)
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            this.user = response.data.data
            this.router.push({ name: 'assets', params: { organization: response.data.data.organization.slug } })
          })
          .catch(error => {})
      },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
