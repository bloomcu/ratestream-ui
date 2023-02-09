import ContentInventory from '@/views/content/ContentInventory.vue'

export default [
  {
    path: "/:organization/content",
    name: "content",
    component: ContentInventory,
  },
]
