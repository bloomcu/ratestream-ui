import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const csvApi = {
    /**
     * Show a csv
     *
     * @param Integer id [Id of the csv file you want to show]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/csv/${id}`)
    },
}

export { csvApi }
