<template>
  <noti-card
    v-for="notification in personalNotifications"
    :notification="notification"
    :key="notification.timeStamp"
  ></noti-card>
</template>
<script>
import NotiCard from "@/cards/NotiCard.vue";
import { mapGetters } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapGetters(["userAddress", "personalNotifications"]),
  },
  created() {
    store.dispatch("getPersonalNotifications", this.userAddress);
  },
  components: {
    notiCard: NotiCard,
  },
};
</script>
