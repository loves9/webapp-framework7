import HomePage from './pages/Home.vue';
import AboutPage from './pages/About.vue';
import FormPage from './pages/Form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import DetailPage from './pages/Detail.vue';

export default [
  {
    name: '/home/',
    path: '/',
    component: HomePage,
    // keepAlive: true
  },
  {
    name: '/about/',
    path: '/about/',
    component: AboutPage
  },
  {
    name: '/detail/',
    path: '/detail/',
    component: DetailPage
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
