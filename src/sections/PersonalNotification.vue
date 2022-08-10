<template>
  <noti-card
    v-for="notification in personalNotificationsList"
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
    ...mapGetters(["userAddress","searchText", "personalNotifications"]),
    personalNotificationsList() {
      if (this.searchText != "") {
        return this.personalNotifications.filter((notification) => {
          return notification.notification
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      } else {
        return this.personalNotifications;
      }
    }
  },
  created() {
    store.dispatch("getPersonalNotifications", this.userAddress);
  },
  components: {
    notiCard: NotiCard,
  },
};
</script>
