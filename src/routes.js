import HomePage from './pages/HomeScreen.vue'
import AboutPage from './pages/AboutScreen.vue'
import FormPage from './pages/FormScreen.vue'
import DynamicRoutePage from './pages/DynamicRoute.vue'
import NotFoundPage from './pages/NotFound.vue'

export default [
  // {
  //   name: '(.*)',
  //   path: '(.*)',
  //   component: HomePage
  // },
  // {
  //   name: '/',
  //   path: '/',
  //   redirect: '/about/',
  //   // component: HomePage
  //   // keepAlive: true
  // },
  {
    name: '/home/',
    path: '/home/',
    component: HomePage
  },
  {
    name: '/about/',
    path: '/about/',
    component: AboutPage
  },
  {
    name: '/form/',
    path: '/form/',
    component: FormPage
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  }
]
