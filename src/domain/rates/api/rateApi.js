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
    update(organization, uid, data) {
      return HttpClient.put(`/${organization}/rates/${uid}`, data)
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
    
    /**
     * Import rates from CSV
     *
     * @param Object csv [csv data you want to import]
     * @return promise
     */
    import(organization, csv) {
        return HttpClient.post(`/${organization}/rates/import`, {
          columns: csv.columns,
          rows: csv.rows,
        })
    },

    /**
     * Store a column
     *
     * @param Object name [The column name]
     * @return promise
     */
    storeColumn(organization, name, order = null) {
      return HttpClient.post(`/${organization}/columns`, name, order)
  },
}

export { rateApi }
