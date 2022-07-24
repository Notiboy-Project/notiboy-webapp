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
export default {
  computed: {
    ...mapGetters(["searchText","channels"]),
    channelList() {
      if (this.searchText != "") {
        return this.channels.filter((channel) => {
          return channel.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      } else {
        return this.channels;
      }
    },
  },
  components: {
    channelCard: ChannelCard,
  },
};
</script>
