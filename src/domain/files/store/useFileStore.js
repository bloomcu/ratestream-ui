import { defineStore, acceptHMRUpdate } from 'pinia'
import { fileApi as FileApi } from '@/domain/files/api/fileApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: [],
        file: null,
        isLoading: true,
    }),
    
    getters: {
      whereGroup: (state) => {
        let {files} = state.files
        
        return (group) => files.filter((file) => {
          return file.group === group
        })
      }
    },
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.files = null
          
          FileApi.index(auth.organization, params)
            .then(response => {
              this.files = response.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(file) {
          // console.log(file)
          const auth = useAuthStore()
          this.isLoading = true
          
          await FileApi.store(auth.organization, file)
            .then(response => {
              this.files.push(response.data)
              this.show(response.data.id)
            }).catch(error => {
              console.log('Error', error)
            })
        },
        
        show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          FileApi.show(auth.organization, id)
            .then(response => {
              this.file = response.data
              this.isLoading = false
            })
        },
        
        update() {
          const auth = useAuthStore()
          this.isLoading = true
          
          FileApi.update(auth.organization, this.file.id, this.file)
            .then(response => {
              console.log('File successfully updated')
              this.isLoading = false
            })
        },
        
        destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          FileApi.destroy(auth.organization, id)
            .then(response => {
              this.files = this.files.filter((file) => file.id !== id)
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
    import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
}
