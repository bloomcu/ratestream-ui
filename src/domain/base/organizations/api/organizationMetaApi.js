import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const organizationMetaApi = {    
    /**
     * List all organization meta
     * 
     * @param String organization [Slug of the organization]
     * @return promise
     */
    index(organization) {
        return HttpClient.get(`/organizations/${organization}/meta`)
    },
    
    /**
     * Store a metadata item for organization
     *
     * @param String organization [Slug of the organization]
     * @param Object meta [Object to create meta entry from. Must include key and value attributes.]
     * @return promise
     */
    store(organization, meta) {
        return HttpClient.post(`/organizations/${organization}/meta`, meta)
    },
    
    /**
     * Store a metadata item for organization
     *
     * @param String organization [Slug of the organization]
     * @param String key [Meta item key column]
     * @return promise
     */
    show(organization, key) {
        return HttpClient.get(`/organizations/${organization}/meta/${key}`)
    }
}

export { organizationMetaApi }
