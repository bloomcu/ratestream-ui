import { defineStore, acceptHMRUpdate } from 'pinia'
import { statusApi as StatusApi } from '@/domain/base/statuses/api/statusApi'

export const useStatusStore = defineStore('statusStore', {
    state: () => ({
        status: {},
        statuses: [],
        createModalOpen: false,
        isLoading: false,
    }),
    
    getters: {
      children: (state) => state.status.children
    },
    
    actions: {
      // index(params) {
      //   this.statuses = []
      // 
      //   StatusApi.index(params)
      //     .then(response => {
      //       this.statuses = response.data.data
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      // async store(status) {
      //   await StatusApi.store(status)
      //     .then(response => {
      //       this.statuses.unshift(response.data.data)
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      show(slug) {
        this.status = [
          {
            title: 'Needs review',
            slug: 'needs-review',
            children: []
          },
          {
            title: 'Looks good',
            slug: 'looks-good',
            children: []
          },
          {
            title: 'Not sure',
            slug: 'not-sure',
            children: []
          }
        ]
        // StatusApi.show(slug)
        //   .then(response => {
        //     this.status = response.data.data
        //   }).catch(error => {
        //     console.log('Error', error.response.data)
        //   })
      },
      
      // update() {
      //   StatusApi.update(this.status.id, this.status)
      //     .then(response => {
      //       console.log('Status successfully updated')
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      // destroy(status) {
      //   this.statuses = this.statuses.filter((t) => t.id !== status.id)
      // 
      //   StatusApi.destroy(status.id)
      //     .then(response => {
      //       console.log('Status successfully destroyed')
      //     }).catch(error => {
      //       this.statuses.unshift(status)
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      // toggleCreateModal() {
      //   this.createModalOpen = !this.createModalOpen
      // }
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStatusStore, import.meta.hot))
}
