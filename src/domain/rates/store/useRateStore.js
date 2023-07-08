import set from "lodash/set";
import { defineStore, acceptHMRUpdate } from 'pinia'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useRateStore = defineStore('rateStore', {
    state: () => ({
        rates: [],
        // rate: null,
        columns: [],
        // column: null,
        // edits: [],
        isLoading: true,
        isImporting: false,
        isEditing: false,
        isPublishPromptModalOpen: false,
    }),
    
    getters: {
      whereUid: (state) => {
        let rates = state.rates
        
        return (uid) => rates.filter((rate) => {
          return rate.uid === uid
        })
      },

      whereGroup: (state) => {
        let {rates} = state.rates
        
        return (group) => rates.filter((rate) => {
          return rate.group === group
        })
      }
    },
    
    actions: {
        async index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await RateApi.index(auth.organization, params)
            .then(response => {
              this.rates = response.data.rates
              this.columns = response.data.columns

              setTimeout(() => {
                this.isLoading = false
              }, 800)
            })
        },
        
        // async store() {
        //   const auth = useAuthStore()
        //   // this.isLoading = true
          
        //   let uid = Math.floor(100000 + Math.random() * 900000).toString()
        //   let rate = {
        //     new: true,
        //     data: {},
        //     uid: uid
        //   }

        //   this.rates.push(rate)

        //   await RateApi.store(auth.organization, rate)
        //     .then((response) => {
        //       // this.rates.push(response.data.data)
        //       console.log('Rate successfully stored')
        //     })
        // },
        
        // show(id) {
        //   const auth = useAuthStore()
        //   this.isLoading = true
          
        //   RateApi.show(auth.organization, id)
        //     .then(response => {
        //       this.rate = response.data.data
        //       this.isLoading = false
        //     })
        // },
        
        // async update(uid, data) {
        //   const auth = useAuthStore()
        //   // this.isLoading = true
          
        //   await RateApi.update(auth.organization, uid, {data: data})
        //     .then(response => {
        //       console.log('Rate successfully updated')
        //       // this.isLoading = false
        //     })
        // },
        
        // destroy(id) {
        //   const auth = useAuthStore()
        //   this.isLoading = true
          
        //   RateApi.destroy(auth.organization, id)
        //     .then(() => {
        //       this.rates = this.rates.filter((rate) => rate.id !== id)
        //       this.isLoading = false
        //     })
        // },
        
        batch() {
          const auth = useAuthStore()
          this.isImporting = true
          
          RateApi.batch(auth.organization, this.rates, this.columns)
            .then(response => {
              console.log('Batch updated', response.data)

              setTimeout(() => {
                this.isImporting = false
                this.toggleIsEditing()
              }, 1000)
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

        // async updateUid(uid, newUid) {
        //   const auth = useAuthStore()
          
        //   await RateApi.updateUid(auth.organization, uid, newUid)
        //     .then(response => {
        //       console.log('Rate UID successfully updated')
        //     })
        // },

        updateCell(uid, column, value) {
          let rate = this.whereUid(uid)

          if (!rate.data[column]) {
            rate.data = {...rate.data, [column]: value }
          } else {
            rate.data[column] = value
          }

          // this.whereUid(uid).data[column] = value

          // set({
          //   object: this.rates,
          //   path: this.whereUid(uid).data[column],
          //   value: value,
          // })

          // rateStore.update(uid, {column: event.target.innerText})
          //   .then(() => {
          //     console.log('Rate cell successfully updated')
          //   })
        },

        addRow() {
          let uid = Math.floor(100000 + Math.random() * 900000).toString()

          let row = {
            uid: uid,
            data: {},
            new: true,
          }

          this.rates.push(row)
        },

        addColumn() {
        // async storeColumn() {
          // const auth = useAuthStore()

          let order = this.columns.length + 2
          let name = 'Column ' + order

          this.columns.push({
            name: name,
            order: order
          })

          // await RateApi.storeColumn(auth.organization, {name: name, order: order})
          //   .then(() => {
          //     console.log('Column successfully stored')
          //   })
        },

        cancelEditing() {
          this.index()
            .then(
              this.toggleIsEditing()
            )
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
