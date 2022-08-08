<template>
  <noti-card
    v-for="notification in publicNotifications"
    :notification="notification"
    :key="notification.timeStamp"
  ></noti-card>
</template>
<script>
import NotiCard from "@/cards/NotiCard.vue";
import { mapGetters } from "vuex";
import { useRoute } from 'vue-router';
import store from "../store";
export default {
  computed: {
    ...mapGetters(["publicNotifications"]),
  },
  beforeMount() {
    const route = useRoute();
    store.dispatch("getPublicNotifications", route.params.lsig);
  },
  components: {
    notiCard: NotiCard,
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
