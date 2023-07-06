import { defineStore, acceptHMRUpdate } from 'pinia'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useRateStore = defineStore('rateStore', {
    state: () => ({
        rates: [],
        rate: null,
        columns: [],
        column: null,
        edits: [],
        isLoading: true,
        isImporting: false,
        isEditing: false,
        isPublishPromptModalOpen: false,
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
              this.rates = response.data.rates
              this.columns = response.data.columns
              this.isLoading = false
            })
        },
        
        async store() {
          const auth = useAuthStore()
          // this.isLoading = true
          
          let uid = Math.floor(100000 + Math.random() * 900000).toString()
          let rate = {
            new: true,
            data: {},
            uid: uid
          }

          this.rates.push(rate)

          await RateApi.store(auth.organization, rate)
            .then((response) => {
              // this.rates.push(response.data.data)
              console.log('Rate successfully stored')
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
        
        async update(uid, data) {
          const auth = useAuthStore()
          // this.isLoading = true
          
          await RateApi.update(auth.organization, uid, {data: data})
            .then(response => {
              console.log('Rate successfully updated')
              // this.isLoading = false
            })
        },
        
        destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          RateApi.destroy(auth.organization, id)
            .then(() => {
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
                this.isImporting = false
                this.toggleIsPublishPromptModal()
                this.router.push({ name: 'rates' })
              }, 1500)
            })
        },

        async updateUid(uid, newUid) {
          const auth = useAuthStore()
          
          await RateApi.updateUid(auth.organization, uid, newUid)
            .then(response => {
              console.log('Rate UID successfully updated')
            })
        },

        async storeColumn() {
          const auth = useAuthStore()

          let order = this.columns.length + 2
          let name = 'Column ' + order

          this.columns.push({
            name: name,
            order: order
          })

          await RateApi.storeColumn(auth.organization, {name: name, order: order})
            .then(() => {
              console.log('Column successfully stored')
            })
        },

        toggleIsEditing() {
          this.isEditing = !this.isEditing
        },
        
        toggleIsPublishPromptModal() {
          this.isPublishPromptModalOpen = !this.isPublishPromptModalOpen
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRateStore, import.meta.hot))
}
