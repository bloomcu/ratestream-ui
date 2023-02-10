import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const categoryApi = {
  /**
   * List parent categories
   *
   * @return promise
   */
  index(params) {
    return HttpClient.get(`/categories`)
  },
  
  /**
   * Store a category
   *
   * @param Object category [Properties to create category from]
   * @return promise
   */
  store(category) {
    return HttpClient.post(`/categories`, category)
  },
  
  /**
   * Show a category with it's children
   *
   * @param String slug [Slug of the category you want to show]
   * @return promise
   */
  show(slug) {
    return HttpClient.get(`/categories/${slug}`)
  },
  
  /**
   * Update a category
   *
   * @param String slug [Slug of the category you want to update]
   * @param Object category [Properties to update category with]
   * @return promise
   */
  update(slug, category) {
    return HttpClient.put(`/categories/${slug}`, category)
  },
  
  /**
   * Destroy a category
   *
   * @param String slug [Slug of the category you want to destroy]
   * @return promise
   */
  destroy(slug) {
    return HttpClient.delete(`/categories/${slug}`)
  },
}

export { categoryApi }
