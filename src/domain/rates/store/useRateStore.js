import { defineStore, acceptHMRUpdate } from 'pinia'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useRateStore = defineStore('rateStore', {
    state: () => ({
        rates: null,
        rate: null,
        isLoading: true,
        isImporting: false,
        editPromptModalOpen: false,
        publishPromptModalOpen: false,
    }),
    
    getters: {
      whereGroup: (state) => {
        let {rates} = state.rates
        
        return (group) => rates.filter((rate) => {
          return rate.group === group
        })
      }
    },
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          
          RateApi.index(auth.organization, params)
            .then(response => {
              this.rates = response.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(rate) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await RateApi.store(auth.organization, rate)
            .then(response => {
              this.rates.push(response.data.data)
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          RateApi.show(auth.organization, id)
            .then(response => {
              this.rate = response.data.data
              this.isLoading = false
            })
        },
        
        update() {
          const auth = useAuthStore()
          this.isLoading = true
          
          RateApi.update(auth.organization, this.rate.id, this.rate)
            .then(response => {
              console.log('Rate successfully updated')
              this.isLoading = false
            })
        },
        
        destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          RateApi.destroy(auth.organization, id)
            .then(response => {
              this.rates = this.rates.filter((rate) => rate.id !== id)
              this.isLoading = false
            })
        },
        
        import(csv) {
          const auth = useAuthStore()
          this.isImporting = true
          
          RateApi.import(auth.organization, csv)
            .then(response => {
              console.log('CSV imported', response.data)
              setTimeout(() => {
                this.router.push({ name: 'rates' })
                this.togglePublishPromptModal()
                this.isImporting = false
              }, 1500)
            })
        },
        
        toggleEditPromptModal() {
          this.editPromptModalOpen = !this.editPromptModalOpen
        },
        
        togglePublishPromptModal() {
          this.publishPromptModalOpen = !this.publishPromptModalOpen
        }
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRateStore, import.meta.hot))
}
