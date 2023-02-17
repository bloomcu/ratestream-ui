import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const fileApi = {
    /**
     * List files
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/files`, { params: params })
    },
    
    /**
     * Store a file
     *
     * @param Object file [Properties to create file from]
     * @return promise
     */
    store(organization, file) {
        return HttpClient.post(`/${organization}/files`, {
          file: file
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
    /**
     * Show a file
     *
     * @param Integer id [Slug of the file you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/files/${id}`)
    },
    
    /**
     * Update a file
     *
     * @param Integer id [Id of the file you want to update]
     * @param Object  file [Properties to update file with]
     * @return promise
     */
    update(organization, id, file) {
      return HttpClient.put(`/${organization}/files/${id}`, file)
    },
    
    /**
     * Destroy a file
     *
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/files/${id}`)
    },
}

export { fileApi }
