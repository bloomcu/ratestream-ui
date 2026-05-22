import Organizations from '@/views/base/organizations/Organizations.vue'
import OrganizationsEdit from '@/views/base/organizations/OrganizationsEdit.vue'

export default [
  {
    path: "/organizations",
    name: "organizations",
    component: Organizations,
    meta: { authorize: ['super_admin'] }
  },
  {
    path: "/organizations/:organization/edit",
    name: "organizationsEdit",
    component: OrganizationsEdit,
    meta: { authorize: ['super_admin'] }
  },
]
