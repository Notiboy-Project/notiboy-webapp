<template>
  <noti-card
    v-for="notification in notifications"
    :notification="notification"
    :key="notification.number"
  ></noti-card>
</template>
<script>
import NotiCard from "@/cards/NotiCard.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["notifications"]),
  },
  components: {
    notiCard: NotiCard,
  },
};
</script>
