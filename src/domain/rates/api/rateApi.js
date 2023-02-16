import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const rateApi = {
    /**
     * List rates
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/rates`, { params: params })
    },
    
    /**
     * Store a rate
     *
     * @param Object rate [Properties to create rate from]
     * @return promise
     */
    store(organization, rate) {
        return HttpClient.post(`/${organization}/rates`, rate)
    },
    
    /**
     * Show a rate
     *
     * @param Integer id [Slug of the rate you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/rates/${id}`)
    },
    
    /**
     * Update a rate
     *
     * @param Integer id [Id of the rate you want to update]
     * @param Object  rate [Properties to update rate with]
     * @return promise
     */
    update(organization, id, rate) {
      return HttpClient.put(`/${organization}/rates/${id}`, rate)
    },
    
    /**
     * Destroy a rate
     *
     * @param Integer id [Id of the file you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/${organization}/rates/${id}`)
    },
}

export { rateApi }
