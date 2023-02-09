import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
      loading: false
  }),

  actions: {
    setLoading(isLoading) {
      this.loading = isLoading
    }
  }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot))
}
