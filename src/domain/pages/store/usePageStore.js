import { defineStore, acceptHMRUpdate } from 'pinia'
import { pageApi as PageApi } from '@/domain/pages/api/pageApi'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    pages: [],
    page: {},
    selected: [],
    lastSelected: null,
    contentCategoryModalOpen: false,
    contentExportModalOpen: false,
    isLoading: false,
  }),

  actions: {
    index(params) {
      const auth = useAuthStore()
      this.isLoading = true

      PageApi.index(auth.organization, params)
        .then(response => {
          this.pages = response.data.data
          this.isLoading = false
        }).catch(error => {
          console.log('Error', error.response.data)
        })
    },

    async store(page) {
      const auth = useAuthStore()

      await PageApi.store(auth.organization, page)
        .then(response => {
          this.pages.unshift(response.data.data)
        }).catch(error => {
          return Promise.reject(error)
        })
    },

    show(id) {
      const auth = useAuthStore()
      this.isLoading = true

      PageApi.show(auth.organization, id)
        .then(response => {
          this.page = response.data.data
          this.isLoading = false
        }).catch(error => {
          console.log('Error', error.response.data)
        })
    },
    
    async update(ids, properties) {
      const auth = useAuthStore()
      
      await PageApi.update(auth.organization, ids, properties)
        .then(response => {
          console.log(ids.length + ' page(s) updated')
          // this.selected = []
        })
        
      // TODO: Catch error and re-index pages if error
    },

    async destroy(ids) {
      const auth = useAuthStore()
      
      await PageApi.destroy(auth.organization, ids)
        .then(response => {
          console.log(ids.length + ' page(s) deleted')
          this.pages = this.pages.filter((p) => !ids.includes(p.id)) // remove resources
        })
        
      // TODO: Catch error and re-index pages if error
      // try {
      //   const response = await PageApi.destroy(auth.organization, id)
      //   console.log('Page deleted')
      // } catch (error) {
      //   this.pages.unshift(page) // restore resource
      //   console.log('Error', error.response.data)
      // }
    },
    
    // async exportToCSV(ids) {
    //   const auth = useAuthStore()
    // 
    //   await PageApi.exportToCSV(auth.organization)
    //     .then(response => {
    //       this.contentExportModalOpen = false
    //     })
    // },

    selectPage(id, event) {
      // Add to array if not present. Remove if already present.
      // TODO: Abstract this away
      let index = this.selected.indexOf(id)
          index === -1 ? this.selected.push(id) : this.selected.splice(index, 1)

      // Handle multiselect
      if (event.shiftKey) {
        if (this.lastSelected == null) {
          this.lastSelected = id
          return;
        }

        // Get array of all page id's
        let pageIds = this.pages.map((page) => page.id)

        // Get selection range
        let from = pageIds.indexOf(id)
        let to = pageIds.indexOf(this.lastSelected)

        // Setup the range of our selection
        let range = [to, from].sort()

        // Slice our selection from source array
        let selection = pageIds.slice(...range)

        // Add selection to destination array
        this.selected = [...new Set([...this.selected, ...selection])];

        this.lastSelected = null
      }

      this.lastSelected = id
    },
    
    selectAllPages() {
      this.selected.length == this.pages.length ? this.selected = [] : this.selected = this.pages.map((page) => page.id)
    },

    clearSelectedPages() {
      this.selected = []
    },
    
    toggleContentCategoryModal() {
      this.contentCategoryModalOpen = !this.contentCategoryModalOpen
    },
    
    toggleContentExportModal() {
      this.contentExportModalOpen = !this.contentExportModalOpen
    },
  }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
