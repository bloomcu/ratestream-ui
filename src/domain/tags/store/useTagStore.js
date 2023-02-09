import { defineStore, acceptHMRUpdate } from 'pinia'
import { tagApi as TagApi } from '@/domain/tags/api/tagApi'

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tag: {},
        tags: [],
        createModalOpen: false,
        isLoading: false,
    }),
    
    getters: {
      children: (state) => state.tag.children
    },
    
    actions: {
      index(params) {
        this.tags = []
      
        TagApi.index(params)
          .then(response => {
            this.tags = response.data.data
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
      
      async store(tag) {
        await TagApi.store(tag)
          .then(response => {
            this.tags.unshift(response.data.data)
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
      
      show(slug) {
        TagApi.show(slug)
          .then(response => {
            this.tag = response.data.data
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
        
      update() {
        TagApi.update(this.tag.id, this.tag)
          .then(response => {
            console.log('Tag successfully updated')
          }).catch(error => {
            console.log('Error', error.response.data)
          })
      },
        
      destroy(tag) {
        this.tags = this.tags.filter((t) => t.id !== tag.id)
        
        TagApi.destroy(tag.id)
          .then(response => {
            console.log('Tag successfully destroyed')
          }).catch(error => {
            this.tags.unshift(tag)
            console.log('Error', error.response.data)
          })
      },
      
      toggleCreateModal() {
        this.createModalOpen = !this.createModalOpen
      }
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot))
}
