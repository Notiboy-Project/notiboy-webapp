<template>
  <!-- Header consisting of desktop and mobile view -->
  <div v-if="show" class="main-nav">
    <div class="brand_logo">
      <a href="#"><img src="../assets/logo.png" alt="" /></a>
    </div>
    <!-- <div
      v-show="connectionStatus == 'Disconnect'"
      @click.prevent="doRefresh"
      style="cursor: pointer"
    >
      <img height="30" src="../assets/refresh.png" alt="refresh" />
    </div> -->
    <div v-if="optinState == false" @click="channelOptin" class="optin">
      Opt-In
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <div class="main-address">
      <p>{{ updatedAddress }}</p>
    </div>
    <div @click="walletInteraction" class="wallet">
      <ul class="wallet-background">
        <p>{{ connectionStatus }}</p>
      </ul>
    </div>
  </div>
  <!-- Header for connect page -->
  <div v-if="!show" class="connect-nav">
    <div class="brand_logo">
      <a href="#"><img src="../assets/logo.png" alt="" /></a>
    </div>
  </div>
  <!-- Mobile Nav -->
  <div v-if="show" class="mobile-nav">
    <label @click="navOpen">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <div class="brand_logo">
      <a href="#"><img src="../assets/logo.png" alt="" /></a>
    </div>
    <div></div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    ...mapGetters([
      "userAddress",
      "updatedAddress",
      "connectionStatus",
      "optinState",
    ]),
  },
  // Declare the event emiited and props passed nav-opened event emiited for opening the mobile nav. Show prop is
  // passed from parent component as a boolean value which determine which navigation to show (mobile or main nav).
  emits: ["nav-opened"],
  props: ["show"],
  methods: {
    navOpen() {
      this.$emit("nav-opened");
    },
    walletInteraction() {
      if (this.connectionStatus == "Connect") {
        this.$emit("showConnectOverlay");
      } else {
        store.dispatch("disconnect");
      }
    },
    channelOptin() {
      store.dispatch("channelOptin", this.userAddress);
    },
    // // The method which will refresh the list of personal notifications and list of channnels on click.
    // doRefresh() {
    //   this.isLoading = true;
    //   store.dispatch("getPersonalNotifications", this.userAddress);
    //   store.dispatch("getChannelList").then(() => (this.isLoading = false));
    // },
  },
  mounted() {
    store.dispatch("updateAddress");
  },
  components: {
    Loading,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* The navigation for desktop view */

.main-nav,
.connect-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1% 7% 0 7%;
  padding: 1.4% 0 1.4% 0;
  letter-spacing: 0.1rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
}

.brand_logo {
  display: flex;
}
.brand_logo a img {
  padding: 0 0 0 1rem;
  width: 7rem;
  height: auto;
}
.wallet {
  /* height: 8rem; */
  display: flex;
  align-items: center;
  color: #ccece6;
  text-decoration: none;
}
.wallet-background {
  background: var(--teritary);
  align-items: center;
  padding-right: 4rem;
  border-radius: 1rem;
  cursor: pointer;
}
/* Navigation for mobile and tablet view */
.mobile-nav {
  display: none;
  justify-content: space-between;
  align-content: center;
  margin: 1rem 5rem 0 5rem;
}
label {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 4.5rem;
  cursor: pointer;
}
label span {
  background: #fff;
  border-radius: 8rem;
  height: 0.5rem;
  margin: 0.4rem 0;
  transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.optin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  padding: 0.65rem;
  cursor: pointer;
}

@media only screen and (max-width: 981px) {
  .main-nav {
    display: none;
  }
  .mobile-nav {
    display: flex;
  }
  .brand_logo a img {
    padding: 1rem 0 1rem 0;
    width: 5rem;
    height: auto;
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
