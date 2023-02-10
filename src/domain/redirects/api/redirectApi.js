import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const redirectApi = {
    /**
     * List redirects
     *
     * @param String organization [Organization slug]
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
      return HttpClient.get(`/${organization}/redirects`, { params: params })
    },
    
    /**
     * Store a redirect
     *
     * @param String organization [Organization slug]
     * @param Object redirect [Properties to create redirect from]
     * @return promise
     */
    store(organization, redirect) {
      return HttpClient.post(`/${organization}/redirects`, redirect)
    },
    
    /**
     * Show a redirect
     *
     * @param String organization [Organization slug]
     * @param Integer id [id of the redirect you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/redirects/${id}`)
    },
    
    /**
     * Update a redirect
     *
     * @param String organization [Organization slug]
     * @param Integer id [Id of the redirect you want to update]
     * @param Object properties [Properties to update redirect with]
     * @return promise
     */
    update(organization, id, properties) {
      return HttpClient.put(`/${organization}/redirects/${id}`, {...properties})
    },
    
    /**
     * Destroy a redirect
     *
     * @param String organization [Organization slug]
     * @param Integer id [Id of the redirect you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
      return HttpClient.delete(`/${organization}/redirects/${id}`)
    },
}

export { redirectApi }
