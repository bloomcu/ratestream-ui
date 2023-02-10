import { createRouter, createWebHistory } from 'vue-router'
import { useErrorStore } from '@/app/store/base/useErrorStore'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import baseRoutes from '@/routes/base/routes.js'
import assets from '@/views/assets/routes/index.js'
import briefs from '@/views/briefs/routes/index.js'
import content from '@/views/content/routes/index.js'
import crawls from '@/views/crawls/routes/index.js'
import dashboard from '@/views/dashboard/routes/index.js'
import designs from '@/views/designs/routes/index.js'
import redirects from '@/views/redirects/routes/index.js'

// import Survey from '@/views/Survey.vue';
// import Flowchart from '@/views/Flowchart.vue';

const routes = [
  ...baseRoutes,
  ...assets,
  ...briefs,
  ...content,
  ...crawls,
  ...dashboard,
  ...designs,
  ...redirects,
  {
    path: '/',
    redirect: 'organizations'
  },
  // { 
  //   path: '/survey', 
  //   component: Survey 
  // },
  // { 
  //   path: '/flowchart', 
  //   component: Flowchart
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

/**
* Clear any form validation errors
* When routing to another view, we don't want form validations errors following us
*/
router.beforeEach(async (to) => {
  const { emptyErrors } = useErrorStore()
  emptyErrors()
})

/**
* Restrict unauthenticated route access
* Redirect to login route if not logged in and trying to access a restricted route
*/
router.beforeEach(async (to) => {
  // TODO: Can I just instantiate this store one in this file?
  const { user } = useAuthStore()
  
  const publicRouteNames = [
    'forgotPassword',
    'invitation',
    'login',
    'register',
    'styleDesignBrief',
    'sitesLaunch',
  ]

  const authRequired = !publicRouteNames.includes(to.name)
  
  if (!user && authRequired) {
    // TODO: Set the return URL so that when the user logs in, they can return here
    // authStore.returnUrl = to.fullPath
    
    return '/login'
  }
})

/**
* Restrict route access by role
* Redirect to unauthorized route if you don't have permissions for route
*/
router.beforeEach(async (to) => {
  const { authorize } = to.meta
  const { user } = useAuthStore()
  
  if (authorize) {
    // We could handle unauthenticated route access here
    // if (!user) {
    //   return '/login'
    // }
    
    // Check if route is restricted by role
    if (authorize.length && !authorize.includes(user.role)) {
      return '/not-authorized'
    }
  }
})

/**
* Setup organization
* Get organization from url, persist in auth store for use in api requests
*/
router.beforeEach(async (to) => {
    // TODO: Can I just instantiate this store one in this file?
    let store = useAuthStore()
    
    if (to.params.organization) {
        store.organization = to.params.organization
    }
})

export default router
