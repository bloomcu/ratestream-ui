import SupscriptionCheckout from '@/views/base/subscriptions/SubscriptionCheckout.vue'
import SubscriptionPlans from '@/views/base/subscriptions/SubscriptionPlans.vue'
import SubscriptionSwap from '@/views/base/subscriptions/SubscriptionSwap.vue'

export default [
  {
    path: "/:organization/subscriptions/checkout/",
    name: "subscription-checkout",
    component: SupscriptionCheckout,
  },
  {
    path: "/:organization/subscriptions/plans",
    name: "subscription-plans",
    component: SubscriptionPlans,
  },
  {
    path: "/:organization/subscriptions/swap",
    name: "subscription-swap",
    component: SubscriptionSwap,
  },
]
