import Tags from '@/views/tags/Tags.vue'

export default [
  {
    path: "/tags",
    name: "tags",
    component: Tags,
    meta: { authorize: ['admin'] }
  },
]
