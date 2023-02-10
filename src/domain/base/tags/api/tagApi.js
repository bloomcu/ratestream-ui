import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const tagApi = {
  /**
   * List tags
   *
   * @param Object params [Key/value params to query by]
   * @return promise
   */
  index(params) {
    return HttpClient.get(`/tags`, { params: params })
  },
  
  /**
   * Store a tag
   *
   * @param Object tag [Properties to create tag from]
   * @return promise
   */
  store(tag) {
    return HttpClient.post(`/tags`, tag)
  },
  
  /**
   * Show a tag with it's children
   *
   * @param String slug [Slug of the tag you want to show]
   * @return promise
   */
  show(slug) {
    return HttpClient.get(`/tags/${slug}`)
  },
  
  /**
   * Update a tag
   *
   * @param String slug [Slug of the tag you want to update]
   * @param Object tag [Properties to update tag with]
   * @return promise
   */
  update(slug, tag) {
    // post = JSON.parse(JSON.stringify(post))
    return HttpClient.put(`/tags/${slug}`, tag)
  },
  
  /**
   * Destroy a tag
   *
   * @param String slug [Slug of the tag you want to destroy]
   * @return promise
   */
  destroy(slug) {
    return HttpClient.delete(`/tags/${slug}`)
  },
}

export { tagApi }
