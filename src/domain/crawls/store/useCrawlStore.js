import { defineStore, acceptHMRUpdate } from 'pinia'
import { crawlApi as CrawlApi } from '@/domain/crawls/api/crawlApi'

import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const useCrawlStore = defineStore('crawlStore', {
    state: () => ({
        crawls: null,
        crawl: null,
        results: null,
        createModalOpen: false,
        isLoading: false,
        isLoadingResults: false,
        isImportingResults: false,
    }),
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.crawls = null
          
          CrawlApi.index(auth.organization, params)
            .then(response => {
              this.crawls = response.data.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(crawl) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await CrawlApi.store(auth.organization, crawl)
            .then(response => {
              this.crawls.unshift(response.data.data)
            })
            .catch((error) => {
              return Promise.reject(error)
            })
        },
        
        async show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          this.crawl = null
          this.results = null
          
          await CrawlApi.show(auth.organization, id)
            .then(response => {
              this.crawl = response.data.data
              this.isLoading = false
            })
        },
        
        async destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await CrawlApi.destroy(auth.organization, id)
            .then(response => {
              this.crawls = this.crawls.filter((crawl) => crawl.id !== id)
              this.isLoading = false
            })
        },
        
        async showResults(crawlId) {
          const auth = useAuthStore()
          this.isLoadingResults = true
          
          await CrawlApi.showResults(auth.organization, crawlId)
            .then(response => {
              this.results = response.data.data
              this.isLoadingResults = false
            })
        },
        
        async importResults(crawlId) {
          const auth = useAuthStore()
          this.isImportingResults = true
          
          await CrawlApi.importResults(auth.organization, crawlId)
            .then(response => {
              this.isImportingResults = false
            })
        },
        
        toggleCreateModal() {
          this.createModalOpen = !this.createModalOpen
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCrawlStore, import.meta.hot))
}
