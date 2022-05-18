import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Connect from "../views/Connect.vue";

const routes = [
  { path: '/', redirect: '/notibox' },
  { path: '/notibox', component: Home },
  { path: '/connect', component: Connect}
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
