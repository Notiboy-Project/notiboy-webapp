import { createRouter, createWebHistory } from "vue-router";

import PrivateNotification from "../components/NotiCard.vue";
import Channels from "../components/ChannelCard.vue";
import SendNotification from "../components/SendCard.vue";
import createChannel from "../components/ChannelCard.vue"
import NotFound from "../views/404.vue";

const routes = [
  { path: "/", redirect: "/privateNotification" },
  { path: "/privateNotification", name:"PrivateNotification", component:PrivateNotification},
  { path: "/channels", name:"Channels", component:Channels},
  { path: "/sendNotification", name:"SendNotification", component:SendNotification},
  { path: "/createChannel", name:"CreateChannel", component:createChannel},
  { path: "/:notfound(.*)", name: "Notfound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
