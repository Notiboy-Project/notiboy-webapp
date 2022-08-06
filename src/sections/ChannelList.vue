<template>
  <channel-card
    v-for="channel in channelList"
    :channel="channel"
    :key="channel.number"
  ></channel-card>
</template>
<script>
import ChannelCard from "@/cards/ChannelCard.vue";
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
  created() {
    store.dispatch("getChannelList");
  },
  components: {
    channelCard: ChannelCard,
  },
};
</script>
