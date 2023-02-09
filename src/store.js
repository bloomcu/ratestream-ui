// import { createPinia } from 'pinia'
// 
// const store = createPinia()
// 
// export default store

// #2
import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

const store = createPinia()

// Inject router into all stores
store.use(({ store }) => {
  store.router = markRaw(router)
})

export default store
