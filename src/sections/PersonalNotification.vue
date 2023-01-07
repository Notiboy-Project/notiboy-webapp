<template>
  <noti-card
    v-for="notification in personalNotificationsList"
    :notification="notification"
    :key="notification.timeStamp"
  ></noti-card>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
  <no-notifications
    v-if="personalNotificationsList.length == 0"
  ></no-notifications>
</template>
<script>
import NotiCard from "@/cards/NotiCard.vue";
import NoNotifications from "@/components/NoNotifications.vue";
import Loading from "vue-loading-overlay";
import { mapGetters } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    ...mapGetters(["userAddress", "searchText", "personalNotifications"]),
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
    },
  },
  created() {
    this.isLoading = true;
    store
      .dispatch("getPersonalNotifications", this.userAddress)
      .then(() => (this.isLoading = false));
  },

  components: {
    notiCard: NotiCard,
    noNotifications: NoNotifications,
    Loading,
  },
};
</script>
