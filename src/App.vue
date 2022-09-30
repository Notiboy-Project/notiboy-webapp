<template>
  <!-- Home view which consist of header, notification pane, sidebar -->
  <div class="home">
    <main-header
      @nav-opened="navStatus = true"
      :show="true"
      @showConnectOverlay="showWalletConnectOverlay"
    ></main-header>
    <!-- Receives an emitted event and then send it to overlay -->
    <mobile-overlay
      @nav-closed="navStatus = false"
      :nav-overlay="navStatus"
      @showConnectOverlay="showWalletConnectOverlay"
    ></mobile-overlay>
    <!-- An event is emitted when the close button is clicked in the child component -->
    <walletConnect
      v-show="walletConnectOverlay"
      @closeConnectOverlay="closeWalletConnectOverlay"
    ></walletConnect>
    <div class="notification-container">
      <main-sidebar></main-sidebar>
      <!-- Using props to send the selection from side bar to notification pane -->
      <notification-pane></notification-pane>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import Overlay from "@/components/MobileNav.vue";
import WalletConnect from "@/components/Wallets.vue";

export default {
  data() {
    return {
      navStatus: false,
      searchbarStatus: true,
      walletConnectOverlay: false,
    };
  },
  methods: {
    showWalletConnectOverlay() {
      this.walletConnectOverlay = true;
    },

    closeWalletConnectOverlay() {
      this.walletConnectOverlay = false;
    },
  },
  created() {
    this.$store.dispatch("updateAddress");
  },
  components: {
    mainSidebar: Sidebar,
    notificationPane: NotificationPane,
    // publicPane: PublicPane,
    mobileOverlay: Overlay,
    walletConnect: WalletConnect,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100vh;
}
.notification-container {
  display: grid;
  min-height: 80%;
  grid-template-columns: 1fr 3fr;
}

@media only screen and (max-width: 981px) {
  .notification-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
