import NotFound from '@/views/common/NotFound.vue'

export default [
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: NotFound,
  },
]
