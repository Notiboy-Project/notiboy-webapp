import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Connect from "../views/Connect.vue";
import NotFound from "../views/404.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/connect", name: "Connect", component: Connect },
  { path: "/dashboard", name: "Dashboard", component: Home },
  { path: "/:notfound(.*)", name: "Notfound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
