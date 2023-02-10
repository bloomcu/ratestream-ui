import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const mediaApi = {    
    /**
     * List media
     *
     * @param String organization [Slug of the organization]
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/media`, { params: params })
    },
    
    /**
     * Store a file
     *
     * @param String organization [Slug of the organization]
     * @param Object file [Object to create file from]
     * @param String collection [Collection to associate media with]
     * @param String tags [Tags to attach to media]
     * @return promise
     */
    store(organization, file, collection, tags) {
        return HttpClient.post(`/${organization}/media`, {
          file: file,
          collection: collection,
          tags: tags
        },
        {
          headers: { "Content-Type": "multipart/form-data" }
        })
    },
    
    /**
     * Destroy a file
     *
     * @param String organization [Slug of the organization]
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/media/${id}`)
    },
}

export { mediaApi }
