import { httpClient as HttpClient } from '@/app/api/httpClient'

const statusApi = {
  /**
   * List statuses
   *
   * @param Object params [Key/value params to query by]
   * @return promise
   */
  index(params) {
    return HttpClient.get(`/statuses`, { params: params })
  },
  
  /**
   * Store a status
   *
   * @param Object status [Properties to create status from]
   * @return promise
   */
  store(status) {
    return HttpClient.post(`/statuses`, status)
  },
  
  /**
   * Show a status with it's children
   *
   * @param String slug [Slug of the status you want to show]
   * @return promise
   */
  show(slug) {
    return HttpClient.get(`/statuses/${slug}`)
  },
  
  /**
   * Update a status
   *
   * @param String slug [Slug of the status you want to update]
   * @param Object status [Properties to update status with]
   * @return promise
   */
  update(slug, status) {
    return HttpClient.put(`/statuses/${slug}`, status)
  },
  
  /**
   * Destroy a status
   *
   * @param String slug [Slug of the status you want to destroy]
   * @return promise
   */
  destroy(slug) {
    return HttpClient.delete(`/statuses/${slug}`)
  },
}

export { statusApi }
