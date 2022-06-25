<template>
  <main-pane>
    <search-bar></search-bar>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    <div class="channel-main">
      <loading v-model:active="isLoading" :can-cancel="false" :on-cancel="onCancel" :is-full-page="fullPage"/>
      <noti-card v-show="selection == 'notification'" v-for="notification in notifications" :notification="notification" :key="notification.number"></noti-card>
      <channel-card v-show="selection == 'public'" v-for="channel in channels" :channel="channel" :key="channel.number"></channel-card>
      <create-card v-if="selection == 'create'"></create-card>
      <send-card v-if="selection == 'send'"></send-card>
      <button @click.prevent="doAjax">fetch Data</button>
    </div>
    <!-- Notification footer -->
    <div class="notification-footer"></div>
  </main-pane>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Noticard from "@/components/NotiCard.vue";
import Public from "@/components/ChannelCard.vue";
import Create from "@/components/CreateCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import SendCard from "@/components/SendCard.vue";
export default {
  data() {
    return {
      isLoading: false,
      fullPage: false,
      notifications:[
        {number: 1 ,channel: 'Angry Penguins', title:'Prepare for War', text: 'We are planning for a war on ice world. Let the world unite.', date:"12 Sep 2022", verified:true},
        {number: 2, channel: 'A for Algorand', title:'Twitter Spaces', text: 'Welcome to twitter spaces everyday morning EST.', date:"18 Sep 2022",verified:true},
        {number: 3, channel: 'Securecerts', title:'Immutable Certificates', text: 'Issue immutable certificates via blockchain using securecerts.', date:"21 Sep 2022",verified:true},
        {number: 4, channel: 'Anirand', title:'Rug Number 1', text: 'We are planning for a rug of rugs. This is anirand metaverse of metaverse.', date:"25 Sep 2022",verified:false}
      ],
      channels:[
        {number: 1, name: 'AoA', verified:true, optIn:true},
        {number: 2, name: 'Angry Penguins NFT', verified:true, optIn:false},
        {number: 3, name: 'Rand Labs', verified:false, optIn:false},
        {number: 4, name: 'ANS', verified:true, optIn:false}
      ]
    }
  },
  props: ["selection"],
  components: {
    notiCard: Noticard,
    channelCard: Public,
    createCard: Create,
    searchBar: SearchBar,
    sendCard: SendCard,
    Loading,
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
          this.isLoading = false
      }, 5000)
    },
    onCancel() {
      console.log('User cancelled the loader.')
    }
  }
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
