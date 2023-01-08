<template>
  <global-optin v-if="optinState == false" @click="globaloptin"></global-optin>
  <div class="channel-container" v-if="optinState == true">
    <channel-card
      v-for="channel in channelList"
      :channel="channel"
      :key="channel.channelIndex"
    ></channel-card>
  </div>
</template>
<script>
import ChannelCard from "@/cards/ChannelCard.vue";
import GlobalOptin from "@/cards/GlobalOptin.vue";
import { mapGetters } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapGetters(["userAddress", "searchText", "channels", "optinState"]),
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
  methods: {
    globaloptin() {
      store.dispatch("userGlobalOptin", this.userAddress);
    },
  },
  created() {
    store.dispatch("optinState");
  },
  mounted() {
    store.dispatch("getChannelList");
  },
  components: {
    channelCard: ChannelCard,
    globalOptin: GlobalOptin,
  },
};
</script>
<style scoped>
.channel-container {
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
