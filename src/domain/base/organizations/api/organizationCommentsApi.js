import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const organizationCommentsApi = {    
    /**
     * List all organization comments
     * 
     * @param {string} organization Slug of the organization
     * @return promise
     */
    index(organization) {
        return HttpClient.get(`/organizations/${organization}/comments`)
    },
    
    /**
     * Store a comment for organization
     *
     * @param    {string} organization  Slug of the organization
     * @param    {object} comment       Comment object
     * @property {string} comment.body  Text body of the comment
     * @property {string} comment.group [Optional] Group to associate comment with
     * @return promise
     */
    store(organization, comment) {
        return HttpClient.post(`/organizations/${organization}/comments`, comment)
    },
    
    /**
     * Destroy a comment
     *
     * @param {string}  organization  Slug of the organization
     * @param {integer} id            Id of the file you want to destroy
     * @return promise
     */
    destroy(organization, id) {
        return HttpClient.delete(`/organizations/${organization}/comments/${id}`)
    },
}

export { organizationCommentsApi }
