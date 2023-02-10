import Tags from '@/views/base/tags/Tags.vue'

export default [
  {
    path: "/tags",
    name: "tags",
    component: Tags,
    meta: { authorize: ['admin'] }
  },
]
