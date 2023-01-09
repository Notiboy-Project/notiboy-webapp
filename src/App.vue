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
    <loading
      v-model:active="loader"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <!-- An event is emitted when the close button is clicked in the child component -->
    <walletConnect
      v-show="walletConnectOverlay"
      @closeConnectOverlay="closeWalletConnectOverlay"
    ></walletConnect>
    <!-- Selecting the user type if not selected -->
    <user-type v-show="userSelectOverlay"></user-type>
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
import Loading from "vue-loading-overlay";
import { mapGetters } from "vuex";
import UserType from '@/components/UserType.vue';
export default {
  data() {
    return {
      navStatus: false,
      searchbarStatus: true,
      walletConnectOverlay: false,
    };
  },
  computed: {
    ...mapGetters(["loader","userSelectOverlay"]),
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
    userType:UserType,
    Loading
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
