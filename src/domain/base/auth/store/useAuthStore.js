import { defineStore, acceptHMRUpdate } from 'pinia'
import { authApi as AuthApi } from '@/domain/base/auth/api/authApi'

// We now get the current route in all stores.
// Use the this.router.currentRoute to get the site.

export const useAuthStore = defineStore('authStore', {
    state: () => ({
      // TODO: Rename this property as "auth"
      user: JSON.parse(localStorage.getItem('user')),
      organization: 'bloomcu',
      loading: false,
      saving: false,
      passwordResetEmailSending: false,
      passwordResetEmailSent: false,
      passwordResetting: false,
      passwordReset: false,
    }),
    
    getters: {
      isAdmin: (state) => state.user?.role === 'admin',
      isEditor: (state) => state.user?.role === 'editor',
    },
    
    actions: {
      setUser(user) {
        this.user = user

        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          return
        }

        localStorage.removeItem('user')
      },

      async refreshUser() {
        if (!this.user?.access_token) return null

        const currentAccessToken = this.user.access_token
        const response = await AuthApi.me()
        const refreshedUser = {
          ...response.data.data,
          access_token: response.data.data.access_token || currentAccessToken,
        }

        this.setUser(refreshedUser)

        if (refreshedUser.organization?.slug) {
          this.organization = refreshedUser.organization.slug
        }

        return refreshedUser
      },

      async login(email, password) {
        const redirect = import.meta.env.VITE_REDIRECT_FROM_LOGIN_ROUTE
        
        await AuthApi.login(email, password)
          .then(response => {      
            // TODO: Do I need to do this if we set the organization in httpClient? No.
            this.setUser(response.data.data)
            this.organization = response.data.data.organization.slug
            this.router.push({ name: redirect, params: { organization: response.data.data.organization.slug }})
          })
          .catch(error => {})
      },
      
      async logout() {
        this.setUser(null)
        
        await AuthApi.logout()
          .then(response => {
            this.router.push({ name: 'login' })
          })
          .catch(error => {})
      },
      
      async register(name, email, organization_title, password, password_confirmation) {
        const redirect = import.meta.env.VITE_REDIRECT_FROM_LOGIN_ROUTE
        
        await AuthApi.register(name, email, organization_title, password, password_confirmation)
          .then(response => {
            this.setUser(response.data.data)
            this.organization = response.data.data.organization.slug
            
            // TODO: The next step for user will be to setup their organization
            // this.router.push({ name: 'onboardOrganization' })
            this.router.push({ name: redirect, params: { organization: response.data.data.organization.slug }})
          })
          .catch(error => {})
      },
      
      async registerWithInvitation(invitation_uuid, name, email, password, password_confirmation) {
        const redirect = import.meta.env.VITE_REDIRECT_FROM_LOGIN_ROUTE
        
        await AuthApi.registerWithInvitation(invitation_uuid, name, email, password, password_confirmation)
          .then(response => {
            this.setUser(response.data.data)
            this.router.push({ name: redirect, params: { organization: response.data.data.organization.slug }})
          })
          .catch(error => {})
      },
      
      async requestPasswordReset(email) {
        this.passwordResetEmailSending = true
        
        await AuthApi.requestPasswordReset(email)
          .then(response => {
            this.passwordResetEmailSending = false
            this.passwordResetEmailSent = true
          })
          .catch(error => {
            this.passwordResetEmailSending = false
          })
      },
      
      async resetPassword(token, email, password, password_confirmation) {
        this.passwordResetting = true
        
        await AuthApi.resetPassword(token, email, password, password_confirmation)
          .then(response => {
            this.passwordResetting = false
            this.passwordReset = true
          })
          .catch(error => {
            this.passwordResetting = false
          })
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
