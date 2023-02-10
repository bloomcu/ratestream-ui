import Users from '@/views/base/users/Users.vue'

export default [
  {
    path: "/:organization/users",
    name: "users",
    component: Users,
  },
]
