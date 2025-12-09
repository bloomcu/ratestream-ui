import Organizations from '@/views/base/organizations/Organizations.vue'

export default [
  {
    path: "/organizations",
    name: "organizations",
    component: Organizations,
    meta: { authorize: ['super_admin'] }
  },
]
