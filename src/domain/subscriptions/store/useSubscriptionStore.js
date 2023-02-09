import { defineStore, acceptHMRUpdate } from 'pinia'
import { subscriptionApi as SubscriptionApi } from '@/domain/subscriptions/api/subscriptionApi'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const useSubscriptionStore = defineStore('subscriptionStore', {
    state: () => ({
        plans: null,
        plan: null,
        planAvailability: null,
        intent: '',
        isLoading: true,
        // createModalOpen: false,
    }),
    
    actions: {
      getIntent() {
        const auth = useAuthStore()
        this.isLoading = true
      
        SubscriptionApi.getIntent(auth.organization)
          .then(response => {
            this.intent = response.data.data.client_secret
            this.isLoading = false
          })
      },
      
      subscribe(payment_method) {
        const auth = useAuthStore()
        this.isLoading = true
      
        SubscriptionApi.store(auth.organization, this.plan.slug, payment_method)
          .then(response => {
            this.isLoading = false
            this.router.push({ name: 'settings', params: { organization: auth.organization } })
          })
      },
      
      update(plan_slug) {
        const auth = useAuthStore()
        this.isLoading = true
      
        SubscriptionApi.update(auth.organization, plan_slug)
          .then(response => {
            this.isLoading = false
            this.router.push({ name: 'settings', params: { organization: auth.organization } })
          })
      },
      
      // TODO: Should probably create "usePlansStore" and "useBillingStore" maybe too
      // Billing could probably be it's own domain
      indexPlans(params) {
        const auth = useAuthStore()
        this.isLoading = true
        this.plans = null
      
        SubscriptionApi.indexPlans(auth.organization, params)
          .then(response => {
            this.plans = response.data.data
            this.isLoading = false
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
      
      getPlanAvailability() {
        const auth = useAuthStore()
        this.isLoading = true
        this.planAvailability = null
      
        SubscriptionApi.getPlanAvailability(auth.organization)
          .then(response => {
            this.planAvailability = response.data.data
            this.isLoading = false
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
      
      // checkout(plan) {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      // 
      //   SubscriptionApi.show(auth.organization, plan)
      //     .then(response => {
      //       this.design = response.data.data
      //       this.isLoading = false
      //     })
      // },
      
      // index(params) {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      //   this.designs = null
      // 
      //   DesignApi.index(auth.organization, params)
      //     .then(response => {
      //       this.designs = response.data.data
      //       this.isLoading = false
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      // 
      // async store(design) {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      // 
      //   await DesignApi.store(auth.organization, design)
      //     .then(response => {
      //       this.designs.unshift(response.data.data)
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      // 
      // show(uuid) {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      // 
      //   DesignApi.show(auth.organization, uuid)
      //     .then(response => {
      //       this.design = response.data.data
      //       this.isLoading = false
      //     })
      // },
      // 
      // update() {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      // 
      //   DesignApi.update(auth.organization, this.design.uuid, this.design)
      //     .then(response => {
      //       console.log('Design successfully updated')
      //       this.isLoading = false
      //     })
      // },
      // 
      // destroy(uuid) {
      //   const auth = useAuthStore()
      //   this.isLoading = true
      // 
      //   DesignApi.destroy(auth.organization, uuid)
      //     .then(response => {
      //       this.designs = this.designs.filter((design) => design.uuid !== uuid)
      //       this.isLoading = false
      //     })
      // },
      // 
      // toggleCreateModal() {
      //   this.createModalOpen = !this.createModalOpen
      // },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSubscriptionStore, import.meta.hot))
}
