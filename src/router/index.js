import { createRouter, createWebHistory } from "vue-router";
import PersonalNotification from "../sections/PersonalNotification.vue";
import PublicNotification from "../sections/PublicNotification.vue";
import Channels from "../sections/ChannelList.vue";
import SendNotification from "../sections/SendNotification.vue";
import CreateChannel from "../sections/CreateChannel.vue";
import NotFound from "../views/404.vue";

const routes = [
  { path: "/", redirect: "/notification/personal" },
  {
    path: "/notification/personal",
    name: "PersonalNotification",
    component: PersonalNotification,
  },
  {
    path: "/notification/channels",
    name: "Channels",
    component: Channels,
  },
  {
    path: "/notification/public/:channel",
    name: "PublicNotification",
    component: PublicNotification,
  },
  {
    path: "/notification/send",
    name: "SendNotification",
    component: SendNotification,
  },
  {
    path: "/notification/createChannel",
    name: "CreateChannel",
    component: CreateChannel,
  },
  { path: "/:notfound(.*)", name: "Notfound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
