import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import router from '@/router'

const store = createPinia()

// Inject router into all stores
store.use(({ store }) => {
  store.router = markRaw(router)
})

export default store
