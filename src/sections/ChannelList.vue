<template>
  <global-optin v-if="optinState == false"></global-optin>
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
  data() {
    return {
      channelList: [],
    };
  },
  computed: {
    ...mapGetters([
      "userAddress",
      "searchText",
      "channels",
      "optinState",
      "channelOptinIdList",
    ]),
  },
  //comparing
  watch: {
    channels() {
      for (let i = 0; i < this.channels.length; i++) {
        if (
          this.channelOptinIdList &&
          this.channelOptinIdList.get(this.channels[i].appIndex)
        ) {
          this.channels[i].userStatus = "optedin";
        } else {
          this.channels[i].userStatus = "optedout";
        }
      }
      if (this.searchText != "") {
        this.channelList = this.channels.filter((channel) => {
          return channel.channelName
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      } else {
        this.channelList = this.channels;
      }
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
  flex-direction: column;
  align-items: center;
  width: 80%;
}
</style>
