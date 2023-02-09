import Designs from '@/views/designs/Designs.vue'
import DesignsEdit from '@/views/designs/DesignsEdit.vue'

export default [
  {
    path: "/:organization/designs",
    name: "designs",
    component: Designs,
  },
  {
    path: "/:organization/designs/:design",
    name: "designsEdit",
    component: DesignsEdit,
    meta: { authorize: ['admin'] }
  },
]
