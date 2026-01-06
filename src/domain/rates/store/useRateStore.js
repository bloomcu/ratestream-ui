// import set from "lodash/set";
import { customAlphabet } from 'nanoid'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { rateApi as RateApi } from '@/domain/rates/api/rateApi'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6)

export const useRateStore = defineStore('rateStore', {
    state: () => ({
        groups: [],
        active_group_id: null,
        
        rates: [], // TODO: Remove this later
        // rate: null,
        columns: [], // TODO: remove this later
        // column: null,
        deletes: [],
        isLoading: true,
        isImporting: false,
        isEditing: false,
        isPublishPromptModalOpen: false,
        isPublishNowPromptModalOpen: false,
        isSchedulePromptModalOpen: false,
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
      },
      getActiveGroup(state) {
        return state.groups.find(group => group.id === state.active_group_id) || { rates: [], columns: [], has_revisions: false }
      }
    },
    
    actions: {
      setActiveGroupId(id) {
        if(this.active_group_id !== id) {
          this.deletes = []
        }
        this.active_group_id = id
      },

      async index(params) {
        const auth = useAuthStore()
        this.deletes = [];
        this.isLoading = true
        
        await RateApi.index(auth.organization, params)
          .then(response => {
            this.groups = response.data.map((group) => {
              return {
                rates: group.rates.map((rate) => {
                  if (!Object.keys(rate.data).length) { rate.data = {} }
                    return rate
                }),
                id: group.group.id,
                revision_of: group.group.revision_of,
                has_revisions: group.group.has_revisions,
                published_at: group.group.published_at,
                columns: group.columns,
              }
            });

            // If rate data attribute is empty, set it to an empty object
            // this.rates = response.data.rates.map((rate) => {
            //   if (!Object.keys(rate.data).length) { rate.data = {} }
            //   return rate
            // })

            // this.columns = response.data.columns

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
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; addRow skipped')
          return
        }
        if (!activeGroup.rates) activeGroup.rates = []
        let uid = nanoid()
        
        activeGroup.rates.push({
          uid: uid,
          data: {},
          // new: true,
        })
      },

      addColumn() {
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; addColumn skipped')
          return
        }
        if (!activeGroup.columns) activeGroup.columns = []
        let uid = nanoid()
        
        let order = activeGroup.columns.length + 1
        let name = 'Column ' + order

        activeGroup.columns.push({
          uid: uid,
          order: order,
          name: name,
        })
      },

      deleteRate(uid) {
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; deleteRate skipped')
          return
        }

        this.deletes.push({
          model: 'rate',
          uid: uid,
          group_id: this.active_group_id,
        })

        activeGroup.rates = activeGroup.rates.filter((rate) => rate.uid !== uid)
      },

      deleteColumn(uid) {
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; deleteColumn skipped')
          return
        }

        this.deletes.push({
          model: 'column',
          uid: uid,
          group_id: this.active_group_id,
        })
        
        activeGroup.columns = activeGroup.columns.filter((column) => column.uid !== uid)
      },
      
      async batch() {
        const saved = await this.saveActiveGroup()
        if (!saved) return
        this.toggleIsPublishPromptModal()
        
      },

      async saveActiveGroup() {
        const auth = useAuthStore()
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; saveActiveGroup skipped')
          return false
        }

        this.isImporting = true
        
        try {
          const response = await RateApi.batch(
            auth.organization,
            activeGroup.rates,
            activeGroup.columns,
            this.deletes,
            this.active_group_id
          )
          console.log('Batch updated', response.data)

          await new Promise((resolve) => setTimeout(resolve, 1000))
          this.isImporting = false
          this.toggleIsEditing()
          return true
        } catch (error) {
          console.error('Batch update failed', error)
          this.isImporting = false
          return false
        }
      },
      async publishNow() {
        const auth = useAuthStore()
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; publishNow skipped')
          return
        }

        this.isImporting = true

        await RateApi.publish(auth.organization, this.active_group_id)
          .then(response => {
            console.log('Published now', response.data)

            setTimeout(() => {
              this.index()
              this.isImporting = false
              this.toggleIsPublishNowPromptModal()
              this.toggleIsEditing()
            }, 1000)
          })
      },

      async import(columns, rows) {
        const auth = useAuthStore()
        this.isImporting = true
        
        await RateApi.batch(auth.organization, rows, columns, [])
          .then(response => {
            console.log('CSV imported', response.data)
            
            setTimeout(() => {
              this.isImporting = false
              this.toggleIsPublishPromptModal()
              this.router.push({ name: 'rates' })
            }, 1500)
          })
      },
      async cloneRateGroup(rategroup_id) {
        const auth = useAuthStore()
        RateApi.clone(auth.organization, rategroup_id)
        .then(response=>{
          
          console.log(response.data);
          const newGroup = {
            rates: response.data.rates.map((rate) => {
              if (!Object.keys(rate.data).length) { rate.data = {} }
                return rate
            }),
            id: response.data.group.id,
            revision_of: response.data.group.revision_of,
            has_revisions: response.data.group.has_revisions,
            published_at: response.data.group.published_at,
            columns: response.data.columns,
          }
          this.groups.push(newGroup)
          this.setActiveGroupId(newGroup.id)
        });
      },

      // import(csv) {
      //   const auth = useAuthStore()
      //   this.isImporting = true
        
      //   RateApi.import(auth.organization, csv)
      //     .then(response => {
      //       console.log('CSV imported', response.data)
      //       setTimeout(() => {
      //         this.isImporting = false
      //         this.toggleIsPublishPromptModal()
      //         this.router.push({ name: 'rates' })
      //       }, 1500)
      //     })
      // },

      export() {
        const auth = useAuthStore()
        const baseURL = import.meta.env.VITE_API_BASE_URL
        window.open(`${baseURL}/${auth.organization}/rates/export`, '_blank')
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
        this.deletes = []
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
      toggleIsPublishNowPromptModal() {
        this.isPublishNowPromptModalOpen = !this.isPublishNowPromptModalOpen
      },
      toggleIsSchedulePromptModal() {
        this.isSchedulePromptModalOpen = !this.isSchedulePromptModalOpen
      },
      async schedulePublication(localDateTime) {
        const auth = useAuthStore()
        const activeGroup = this.getActiveGroup
        if (!this.active_group_id || !activeGroup.id) {
          console.warn('No active group set; schedulePublication skipped')
          return
        }
        if (!localDateTime) {
          console.warn('No schedule datetime provided; schedulePublication skipped')
          return
        }

        const publishedAt = new Date(localDateTime)
        if (Number.isNaN(publishedAt.getTime())) {
          console.warn('Invalid schedule datetime; schedulePublication skipped')
          return
        }

        this.isImporting = true

        await RateApi.schedule(auth.organization, this.active_group_id, publishedAt.toISOString())
          .then(response => {
            console.log('Publication scheduled', response.data)

            setTimeout(() => {
              this.index()
              this.isImporting = false
              this.toggleIsSchedulePromptModal()
            }, 1000)
          })
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
