import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/template',
    name: 'template',
    component: () => import(/* webpackChunkName: "home" */ '../views/generate-template.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
