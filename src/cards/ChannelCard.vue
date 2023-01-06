<template>
  <div class="channel-card">
    <div class="channel-card-details">
      <div @click="showPublicChannel" class="channel-card-name">
        <p class="channel-name">{{ channel.channelName }}</p>
        <img
          v-if="channel.verificationStatus == 'verified'"
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img
          class="copy-icon"
          @click="copyToClipBoard(channel.appIndex)"
          src="https://img.icons8.com/material-rounded/20/ffffff/copy.png"
        />
        <p ref="address" style="padding-left: 0.4rem">{{ channel.appIndex }}</p>
      </div>
    </div>
    <div v-show="ishidden == false"  @click="checkOptinState" class="optin">Show Status</div>
    <div v-if="optinStatus == false" @click="channelOptin" class="optin">Opt-In</div>
    <div v-if="optinStatus == true" @click="channelOptout" class="optin">Opt-Out</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import copy from "copy-to-clipboard";
import store from "../store";
import algosdk from "algosdk";
import Notiboy from "notiboy-js-sdk";
const client = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);
const indexer = new algosdk.Indexer(
  "",
  "https://testnet-idx.algonode.cloud",
  ""
);
const notiboy = new Notiboy(client, indexer);
export default {
  data() {
    return {
      channelAddress: this.channel.dappAddress,
      ishidden:false,
      optinStatus:Boolean
    };
  },
  props: {
    channel: Object,
  },
  computed: {
    ...mapGetters(["userAddress"]),
    showAddress() {
      return (
        this.channelAddress.slice(0, 5) +
        "..." +
        this.channelAddress.slice(52, 58)
      );
    },
  },
  methods: {
    copyToClipBoard(channelAddress) {
      copy(channelAddress);
    },
    showPublicChannel() {
      this.$router.push({
        name: "PublicNotification",
        params: { appIndex: this.channel.appIndex},
      });
    },
    async checkOptinState(){
      this.ishidden = true;
      this.optinStatus = await notiboy.getChannelScOptinState(
        this.userAddress,
        this.channel.appIndex
      )
    },
    channelOptin(){
      store.dispatch("userChannelOptin",{
        userAddress:this.userAddress,
        channelAppIndex:this.channel.appIndex
      })
      this.ishidden = false;
      this.optinStatus = Boolean;
    },
    channelOptout(){
      store.dispatch("userChannelOptout",{
        userAddress:this.userAddress,
        channelAppIndex:this.channel.appIndex
      })
      this.ishidden = false;
      this.optinStatus = Boolean;
    }
  },
};
</script>

<style scoped>
.channel-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: auto;
  margin-bottom: 2rem;
  background-color: var(--primary);
  border-radius: 0.6rem;
  padding: 3% 2% 3% 2%;
}

.channel-card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.channel-card-name {
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
}
.channel-card-address {
  display: flex;
  font-size: 1.4rem;
  align-items: baseline;
  justify-content: center;
  cursor: pointer;
}
.optin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 5rem;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  cursor: pointer;
}

.copy-icon:active {
  transform: translateY(4px);
}

@media only screen and (max-width: 981px) {
  .optin {
    width: 10rem;
    height: 4rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}

@media only screen and (max-width: 580px) {
  .channel-card {
    flex-direction: column;
    align-items: center;
  }

  .optin {
    width: 10rem;
    height: 4rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}
</style>
