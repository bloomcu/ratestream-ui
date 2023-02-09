import { httpClient as HttpClient } from '@/app/api/httpClient'

const designApi = {
    /**
     * List designs
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/designs`, { params: params })
    },
    
    /**
     * Store a design
     *
     * @param Object design [Properties to create design from]
     * @return promise
     */
    store(organization, design) {
        return HttpClient.post(`/${organization}/designs`, design)
    },
    
    /**
     * Show a design
     *
     * @param Integer id [Slug of the design you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/designs/${id}`)
    },
    
    /**
     * Update a design
     *
     * @param String organization [Organization slug]
     * @param Integer id [Id of the design you want to update]
     * @param Object  design [Properties to update design with]
     * @return promise
     */
    update(organization, id, design) {
      return HttpClient.put(`/${organization}/designs/${id}`, design)
    },
    
    /**
     * Destroy a design
     *
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/designs/${id}`)
    },
}

export { designApi }
