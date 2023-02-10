import { createApp } from 'vue'
import store from '@/store'
import router from '@/router'
// import websocket from '@/websocket'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import App from '@/App.vue'

const app = createApp(App)
      app.use(store)
      app.use(router)
      
router.isReady().then(() => {
  app.mount('#app')
})

// Setup realtime websockets
window.Pusher = Pusher

// Use Pusher
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  authEndpoint: import.meta.env.VITE_PUSHER_APP_AUTH_ENDPOINT,
  auth: {
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token
    }
  },
  forceTLS: true,
  encrypted: true,
  disableStats: true,
})
