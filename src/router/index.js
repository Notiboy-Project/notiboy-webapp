import { createRouter, createWebHistory } from "vue-router";
import PersonalNotification from "../sections/PersonalNotification.vue";
import PublicNotification from "../sections/PublicNotification.vue";
import PublicBroadcast from "../sections/PublicBroadcast.vue";
import Channels from "../sections/ChannelList.vue";
import SendNotification from "../sections/SendNotification.vue";
import CreateChannel from "../sections/CreateChannel.vue";
import NotificationCounter from "../sections/NotificationCounter.vue";
import Guide from "../sections/Guide.vue";
import NotFound from "../views/404.vue";
import store from "../store";

const routes = [
  { path: "/", redirect: "/notification/personal" },
  {
    path: "/notification/personal",
    name: "PersonalNotification",
    component: PersonalNotification,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", true);
      store.commit("updatesearchBarDefaultText", "Search Channel Name");
    },
  },
  {
    path: "/notification/channels",
    name: "Channels",
    component: Channels,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", true);
      store.commit("updatesearchBarDefaultText", "Search Channel Name");
    },
  },
  {
    path: "/notification/public/:appIndex/:name",
    name: "PublicNotification",
    component: PublicNotification,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", true);
    },
  },
  {
    path: "/notification/public",
    name: "PublicBroadcast",
    component: PublicBroadcast,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", true);
    },
  },
  {
    path: "/notification/send",
    name: "SendNotification",
    component: SendNotification,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", false);
    },
  },
  {
    path: "/notification/createChannel",
    name: "CreateChannel",
    component: CreateChannel,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", false);
    },
  },
  {
    path: "/notification/counter",
    name: "NotificationCounter",
    component: NotificationCounter,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", false);
    },
  },
  {
    path: "/notification/guide",
    name: "Guide",
    component: Guide,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", false);
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Notfound",
    component: NotFound,
    beforeEnter: () => {
      store.commit("updateSearchBarStatus", false);
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
