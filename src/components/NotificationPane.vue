<template>
  <main-pane>
    <search-bar></search-bar>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    <div class="channel-main">
      <noti-card v-if="selection == 'notification'"></noti-card>
      <channel-card v-if="selection == 'public'"></channel-card>
      <create-card v-if="selection == 'create'"></create-card>
      <send-card v-if="selection == 'send'"></send-card>
    </div>
    <!-- Notification footer -->
    <div class="notification-footer"></div>
  </main-pane>
</template>

<script>
import Noticard from "@/components/NotiCard.vue";
import Public from "@/components/ChannelCard.vue";
import Create from "@/components/CreateCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import SendCard from "@/components/SendCard.vue";
export default {
  props: ["selection"],
  components: {
    notiCard: Noticard,
    channelCard: Public,
    createCard: Create,
    searchBar: SearchBar,
    sendCard: SendCard,
  },
};
</script>

<style scoped>
/* Notification Pane */
.notification-pane {
  background: var(--secondary);
  border-radius: 3rem;
  margin-right: 8%;
  margin-bottom: 4%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.channel-main {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  font-size: 1.3rem;
  color: white;
}

@media only screen and (max-width: 981px) {
  .notification-pane {
    margin-right: 1%;
  }
}

@media only screen and (max-width: 526px) {
  .notification-pane {
    margin-right: 1%;
  }
}
</style>
