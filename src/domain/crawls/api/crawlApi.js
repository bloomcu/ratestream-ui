import { httpClient as HttpClient } from '@/app/api/httpClient'

const crawlApi = {
    /**
     * List crawls
     *
     * @param String organization [Organization slug]
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
      return HttpClient.get(`/${organization}/crawls`, { params: params })
    },
    
    /**
     * Store a crawl
     *
     * @param String organization [Organization slug]
     * @param Object crawl [Properties to create crawl from]
     * @return promise
     */
    store(organization, crawl) {
      return HttpClient.post(`/${organization}/crawls`, crawl)
    },
    
    /**
     * Show a crawl
     *
     * @param String organization [Organization slug]
     * @param Integer id [id of the crawl you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/crawls/${id}`)
    },
    
    /**
     * Destroy a crawl
     *
     * @param String organization [Organization slug]
     * @param Integer id [Id of the crawl you want to destroy]
     * @return promise
     */
    destroy(organization, id) {
      return HttpClient.delete(`/${organization}/crawls/${id}`)
    },
    
    /**
     * Show a crawl's results
     *
     * @param String organization [Organization slug]
     * @param Integer id [id of the crawl you want to show results for]
     * @return promise
     */
    showResults(organization, id) {
      return HttpClient.get(`/${organization}/crawls/${id}/results`)
    },
    
    /**
     * Import a crawl's results as pages
     *
     * @param String organization [Organization slug]
     * @param Integer id [id of the crawl you want to import]
     * @return promise
     */
    importResults(organization, id) {
      return HttpClient.get(`/${organization}/crawls/${id}/import`)
    },
}

export { crawlApi }
