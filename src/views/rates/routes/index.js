import Rates from '@/views/rates/Rates.vue'
import RatesImport from '@/views/rates/RatesImport.vue'

export default [
  {
    path: "/:organization/rates",
    name: "rates",
    component: Rates,
  },
  {
    path: "/:organization/rates/import",
    name: "rates-import",
    component: RatesImport,
  },
]
