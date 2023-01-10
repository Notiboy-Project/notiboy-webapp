<template>
  <div id="navOverlay" class="overlay" :style="{ height }">
    <!-- Button to close the overlay navigation -->
    <a href="#" class="closebtn" @click="closeNav">&times;</a>
    <!-- Overlay content -->
    <div class="overlay-content">
      <li>{{ updatedAddress }}</li>
      <router-link
        v-show="userType == 'user'"
        :to="{ name: 'PersonalNotification' }"
        @click="notiClicked"
        >Noti Box</router-link
      >
      <router-link
        v-show="userType == 'user'"
        :to="{ name: 'Channels' }"
        @click="publicClicked"
        >Channels</router-link
      >
      <!-- <li @click="privateClicked">Private channels</li> -->
      <router-link
        v-show="userType == 'creator'"
        :to="{ name: 'SendNotification' }"
        @click="sendClicked"
        >Send Notification</router-link
      >
      <router-link
        v-show="userType == 'creator'"
        :to="{ name: 'CreateChannel' }"
        @click="createClicked"
        >Create Channels</router-link
      >
      <li @click="walletInteraction">{{ connectionStatus }}</li>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      height: "0%",
    };
  },
  computed: {
    ...mapGetters([
      "userAddress",
      "updatedAddress",
      "connectionStatus",
      "userType",
    ]),
  },
  // Takes a prop from parent component, watches it continuously for changes and changes width of the overlay accordingly.
  props: ["navOverlay"],
  watch: {
    navOverlay() {
      if (this.navOverlay == true) {
        this.height = "100%";
      } else {
        this.height = "0%";
      }
    },
  },
  methods: {
    closeNav() {
      this.height = "0%";
      this.$emit("nav-closed");
    },

    notiClicked() {
      this.closeNav();
    },

    publicClicked() {
      this.closeNav();
    },

    privateClicked() {
      this.closeNav();
    },

    createClicked() {
      this.closeNav();
    },

    sendClicked() {
      this.closeNav();
    },

    channelOptin() {
      store.dispatch("channelOptin", this.userAddress);
    },

    walletInteraction() {
      if (this.connectionStatus == "Connect") {
        this.$emit("showConnectOverlay");
      } else {
        store.dispatch("disconnect");
      }
      this.closeNav();
    },
  },
};
</script>
<style scoped>
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 0%;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0); /* Black fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

.overlay-content {
  position: relative;
  top: 5%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

.overlay a,
.overlay li {
  padding: 8px;
  text-decoration: none;
  font-size: 3rem;
  color: #f1f1f1;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
  cursor: pointer;
}

.overlay a:hover,
.overlay a:focus .overlay li:hover,
.overlay li:focus {
  color: var(--teritary);
}

.overlay .closebtn {
  font-size: 8rem;
  padding-left: 4rem;
  text-decoration: none;
}

@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 2rem;
  }
  .overlay .closebtn {
    font-size: 6rem;
    top: 1.5rem;
    right: 3.5rem;
  }
}
</style>
