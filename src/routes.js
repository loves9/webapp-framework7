import HomePage from './pages/HomeScreen.vue'
import ListPage from './pages/ListScreen.vue'

import AboutPage from './pages/AboutScreen.vue'
import FormPage from './pages/FormScreen.vue'

export default [
  // {
  //   name: '(.*)',
  //   path: '(.*)',
  //   component: HomePage
  // },
  {
    name: '/',
    path: '/',
    component: HomePage
  },
  {
    name: '/home/',
    path: '/home/',
    component: HomePage
  },
  {
    name: '/list/',
    path: '/list/',
    component: ListPage
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
  // {
  //   path: '/dynamic-route/blog/:blogId/post/:postId/',
  //   component: DynamicRoutePage
  // }
]
