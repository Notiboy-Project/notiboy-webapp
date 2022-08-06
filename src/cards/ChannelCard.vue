<template>
  <div class="channel-card">
    <div class="channel-card-details">
      <div @click="showPublicChannel" class="channel-card-name">
        <p class="channel-name">{{ channel.channelName }}</p>
        <img
          v-if="channel.verified == true"
          src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
        />
      </div>
      <div class="channel-card-address">
        <img
          @click="copyToClipBoard(channel.dappAddress)"
          src="https://img.icons8.com/material-rounded/20/ffffff/copy.png"
        />
        <p ref="address" style="padding-left: 0.4rem">{{ showAddress }}</p>
      </div>
    </div>
    <div v-if="channel.optIn == false" class="optin">Opt-In</div>
    <div v-if="channel.optIn == true" class="optin">Opt-Out</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channelAddress: this.channel.dappAddress,
    };
  },
  props: {
    channel: Object,
  },
  computed: {
    showAddress() {
      return this.channelAddress.slice(0, 14) + "...";
    },
  },
  methods: {
    copyToClipBoard(channelAddress) {
      navigator.clipboard.writeText(channelAddress);
    },
    showPublicChannel() {
      this.$router.push({
        name: "PublicNotification",
        params: { channel: this.channel.name },
      });
    },
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
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  cursor: pointer;
}

@media only screen and (max-width: 981px) {
  .optin {
    width: 7rem;
    height: 3rem;
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
    width: 7rem;
    height: 3rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}
</style>
