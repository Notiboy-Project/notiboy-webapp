<template>
  <noti-card
    v-for="notification in publicNotificationsList"
    :notification="notification"
    :key="notification.timeStamp"
  ></noti-card>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
  <no-notifications
    v-if="publicNotificationsList.length == 0"
  ></no-notifications>
</template>
<script>
import NotiCard from "@/cards/NotiCard.vue";
import NoNotifications from "@/components/NoNotifications.vue";
import Loading from "vue-loading-overlay";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import store from "../store";
export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    ...mapGetters(["publicNotifications", "searchText"]),
    publicNotificationsList() {
      if (this.searchText != "") {
        return this.publicNotifications.filter((notification) => {
          return notification.notification
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      } else {
        return this.publicNotifications;
      }
    },
  },
  created() {
    this.isLoading = true;
  },
  mounted() {
    const route = useRoute();
    store
      .dispatch("getPublicNotifications", route.params.lsig)
      .then(() => (this.isLoading = false));
  },
  components: {
    notiCard: NotiCard,
    noNotifications: NoNotifications,
    Loading,
  },
};
</script>
<style scoped>
.notification-card {
  width: 80%;
  height: auto;
  margin-bottom: 2rem;
  border: 0.3rem solid var(--teritary);
  border-radius: 0.6rem;
  padding-left: 2%;
  padding-right: 2%;
}

.notification-card-name {
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  align-items: center;
}

.notification-card-name > img {
  width: 25px;
  height: 25px;
}

.notification-card-heading {
  font-size: 1.4rem;
  font-weight: bold;
}

.notification-card-notification {
  font-size: 1.3rem;
}

.notification-card-timestamp {
  padding-left: 80%;
}

@media only screen and (max-width: 1300px) {
  .notification-card-timestamp {
    padding-left: 75%;
  }
}
@media only screen and (max-width: 1045px) {
  .notification-card-timestamp {
    padding-left: 70%;
  }
}
@media only screen and (max-width: 630px) {
  .notification-card-timestamp {
    padding-left: 50%;
  }
}

@media only screen and (max-width: 400px) {
  .notification-card-timestamp {
    padding-left: 35%;
  }
}
</style>
