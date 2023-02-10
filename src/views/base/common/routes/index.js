import NotFound from '@/views/base/common/NotFound.vue'

export default [
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: NotFound,
  },
]
