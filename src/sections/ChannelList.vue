<template>
  <optin />
  <channel-card
    v-for="channel in channelList"
    :channel="channel"
    :key="channel.channelName"
  ></channel-card>
</template>
<script>
import ChannelCard from "@/cards/ChannelCard.vue";
import Optin from "@/cards/Optin.vue";
import { mapGetters } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapGetters(["searchText", "channels"]),
    channelList() {
      if (this.searchText != "") {
        return this.channels.filter((channel) => {
          return channel.channelName
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      } else {
        return this.channels;
      }
    },
  },
  mounted() {
    store.dispatch("getChannelList");
  },
  components: {
    channelCard: ChannelCard,
    optin: Optin,
  },
};
</script>
