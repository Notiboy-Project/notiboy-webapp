<template>
  <!-- Home view which consist of header, notification pane, sidebar -->
  <div class="home">
    <main-header @nav-opened="navStatus = true" :show="true"></main-header>
    <!-- Receives an emitted event and then send it to overlay -->
    <mobile-overlay
      @pane-selection="changePane"
      @nav-closed="navStatus = false"
      :nav-overlay="navStatus"
    ></mobile-overlay>
    <div class="notification-container">
      <main-sidebar @pane-selection="changePane"></main-sidebar>
      <!-- Using props to send the selection from side bar to notification pane -->
      <notification-pane :selection="currentPane"></notification-pane>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed } from 'vue'

import Sidebar from "@/components/Sidebar.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import Overlay from "@/components/Overlay.vue";

export default {
  data() {
    return {
      navStatus: false,
      currentPane: "notification",
    };
  },
  methods: {
    changePane(changevar) {
      if (changevar == "noticlick") {
        this.currentPane = "notification";
      } else if (changevar == "publicclick") {
        this.currentPane = "public";
      }else if(changevar == "createclick"){
        this.currentPane = "create"
      }
    },
  },
  // Using provide inject to send the change in selection to grand child component 
  provide() {
    return {
      selection: computed(() => this.currentPane)
    }
  },
  created() {
    this.$store.dispatch("updateAddress");
  },
  components: {
    mainSidebar: Sidebar,
    notificationPane: NotificationPane,
    // publicPane: PublicPane,
    mobileOverlay: Overlay,
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
