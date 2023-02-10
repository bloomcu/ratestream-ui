import Sites from '@/views/base/sites/Sites.vue'
import SitesEdit from '@/views/base/sites/SitesEdit.vue'
import SitesLaunch from '@/views/base/sites/SitesLaunch.vue'

export default [
  {
    path: "/:organization/sites",
    name: "sites",
    component: Sites,
  },
  {
    path: "/:organization/sites/:site",
    name: "sitesEdit",
    component: SitesEdit,
  },
  {
    path: "/:organization/sites/:site/launch",
    name: "sitesLaunch",
    component: SitesLaunch,
  },
]
