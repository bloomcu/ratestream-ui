import { defineStore, acceptHMRUpdate } from 'pinia'
import { csvApi as CSVApi } from '@/domain/csv/api/csvApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useCSVStore = defineStore('csvStore', {
    state: () => ({
        csv: null,
        isLoading: true,
    }),

    actions: {
        show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          CSVApi.show(auth.organization, id)
            .then(response => {
              this.csv = response.data.data
              this.isLoading = false
            })
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCSVStore, import.meta.hot))
}
