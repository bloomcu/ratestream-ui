import { defineStore, acceptHMRUpdate } from 'pinia'
import { categoryApi as CategoryApi } from '@/domain/categories/api/categoryApi'

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        category: {},
        categories: [],
        createModalOpen: false,
        isLoading: false,
    }),
    
    getters: {
      children: (state) => state.category.children
    },
    
    actions: {
      // index(params) {
      //   this.categories = []
      // 
      //   CategoryApi.index(params)
      //     .then(response => {
      //       this.categories = response.data.data
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      // async store(category) {
      //   await CategoryApi.store(category)
      //     .then(response => {
      //       this.categories.unshift(response.data.data)
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      show(slug) {
        CategoryApi.show(slug)
          .then(response => {
            this.category = response.data.data
          })
      },
      
      // update() {
      //   CategoryApi.update(this.category.id, this.category)
      //     .then(response => {
      //       console.log('Category successfully updated')
      //     }).catch(error => {
      //       console.log('Error', error.response.data)
      //     })
      // },
      
      // destroy(category) {
      //   this.categories = this.categories.filter((t) => t.id !== category.id)
      // 
      //   CategoryApi.destroy(category.id)
      //     .then(response => {
      //       console.log('Category successfully destroyed')
      //     }).catch(error => {
      //       this.categories.unshift(category)
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
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}
