import HomePage from './pages/Home.vue'
import AboutPage from './pages/About.vue'
import FormPage from './pages/Form.vue'
import DynamicRoutePage from './pages/dynamic-route.vue'
import NotFoundPage from './pages/not-found.vue'

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
