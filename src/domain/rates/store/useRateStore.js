// import set from "lodash/set";
import { customAlphabet } from 'nanoid'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)

export const useRateStore = defineStore('rateStore', {
    state: () => ({
        rates: [],
        // rate: null,
        columns: [],
        // column: null,
        deletes: [],
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
              }, 400)
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
        
        // destroy(uid) {
        //   const auth = useAuthStore()
        //   this.isLoading = true
          
        //   RateApi.destroy(auth.organization, uid)
        //     .then(() => {
        //       this.rates = this.rates.filter((rate) => rate.uid !== uid)
        //       this.isLoading = false
        //     })
        // },

        addRow() {
          let uid = nanoid()

          this.rates.push({
            uid: uid,
            data: {},
            // new: true,
          })
        },

        addColumn() {
          let uid = nanoid()
          let order = this.columns.length + 1
          let name = 'Column ' + order

          this.columns.push({
            uid: uid,
            order: order,
            name: name,
          })
        },

        deleteRate(uid) {
          this.deletes.push({
            model: 'rate',
            uid: uid
          })
          
          this.rates = this.rates.filter((rate) => rate.uid !== uid)
        },

        deleteColumn(uid) {
          this.deletes.push({
            model: 'column',
            uid: uid
          })
          
          this.columns = this.columns.filter((column) => column.uid !== uid)
        },
        
        batch() {
          const auth = useAuthStore()
          this.isImporting = true
          
          RateApi.batch(auth.organization, this.rates, this.columns, this.deletes)
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

        // updateCell(uid, column, value) {
        //   let rate = this.whereUid(uid)

        //   if (!rate.data[column]) {
        //     rate.data = {...rate.data, [column]: value }
        //   } else {
        //     rate.data[column] = value
        //   }
        // },

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
