import Users from '@/views/users/Users.vue'

export default [
  {
    path: "/:organization/users",
    name: "users",
    component: Users,
  },
]
