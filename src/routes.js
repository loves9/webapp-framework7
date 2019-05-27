import HomePage from './pages/Home.vue';
import AboutPage from './pages/About.vue';
import FormPage from './pages/Form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  // {
  //   path: '/',
  //   redirect: '/home/',
  //   // keepAlive: true
  // },
  {
    name: '/home/',
    path: '/',
    component: HomePage,
    // keepAlive: true
  },
  // {
  //   path: '/panel-left/',
  //   component: PanelLeftPage,
  // },
  // {
  //   path: '/panel-right/',
  //   component: PanelRightPage,
  // },
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
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
