import { httpClient as HttpClient } from '@/app/api/httpClient'

const subscriptionApi = {
    // /**
    //  * Purchase a subscription plan
    //  *
    //  * @param String plan [slug of the plan you are purchasing]
    //  * @return promise
    //  */
    // checkout(organization, plan) {
    //     return HttpClient.get(`/${organization}/subscriptions/checkout`, plan)
    // },
    
    /**
     * Get a payment intent from Stripe
     *
     * @return promise
     */
    getIntent(organization) {
        return HttpClient.get(`/${organization}/subscriptions/intent`)
    },
    
    /**
     * Store a new subscription
     *
     * @param String plan_slug [Slug of the plan you want to swap to]
     * @param String payment_method [Stripe payment method id]
     * @return promise
     */
    store(organization, plan_slug, payment_method) {
        return HttpClient.post(`/${organization}/subscriptions/subscriptions`, {
          plan: plan_slug,
          payment_method: payment_method,
        })
    },
    
    /**
     * Update a subscription
     *
     * @param String organization [Organization slug]
     * @param String plan_slug [Slug of the plan you want to swap to]
     * @return promise
     */
    update(organization, plan_slug) {
      return HttpClient.patch(`/${organization}/subscriptions/subscriptions`, {
        plan: plan_slug,
      })
    },
    
    /**
     * List subscription plans
     *
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    indexPlans(organization, params) {
        return HttpClient.get(`/${organization}/subscriptions/plans`, { params: params })
    },
    
    /**
     * Determine which plans an organization can swap to
     *
     * @return promise
     */
    getPlanAvailability(organization) {
        return HttpClient.get(`/${organization}/subscriptions/plans/availability`)
    },
    
    // /**
    //  * Show a design
    //  *
    //  * @param Integer id [Slug of the design you want to show]
    //  * @return promise
    //  */
    // show(organization, id) {
    //   return HttpClient.get(`/${organization}/designs/${id}`)
    // },
    // 
    
    // 
    // /**
    //  * Destroy a design
    //  *
    //  * @param Integer id [Id of the file you want to destroy]
    //  * @return promise
    //  */
    // destroy(organization, id) {
    //     return HttpClient.delete(`/${organization}/designs/${id}`)
    // },
}

export { subscriptionApi }
