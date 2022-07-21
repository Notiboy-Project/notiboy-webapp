<template>
  <div class="sidebar-scroll">
    <ul class="sidebar-menu">
      <router-link :to="{name: 'PrivateNotification'}" @click="notiClicked">
        Noti Box
      </router-link>
      <router-link :to="{name: 'Channels'}"  @click="publicClicked">
        Channels
      </router-link>
      <!-- <li :class="{ 'sidebar-clicked': privateClick }" @click="privateClicked">
        Private Channels
      </li> -->
      <router-link :to="{name: 'SendNotification'}"  @click="sendClicked">
        Send Notification
      </router-link>
      <router-link :to="{name: 'CreateChannel'}"  @click="createClicked">
        Create Channel
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notiClick: true,
      publicClick: false,
      privateClick: false,
      createClick: false,
      sendClick: false,
    };
  },
  // The methods to emit an event to parent (and from there to side pane) to change the dashboard.
  methods: {
    notiClicked() {
      this.$emit("pane-selection", "noticlick");
    },

    publicClicked() {
      this.$emit("pane-selection", "publicclick");
    },

    privateClicked() {
      this.$emit("pane-selection", "privateclick");
    },

    createClicked() {
      this.$emit("pane-selection", "createclick");
    },

    sendClicked() {
      this.$emit("pane-selection", "sendclick");
    },
  }
};
</script>

<style scoped>
.sidebar-scroll {
  display: flex;
  background: var(--secondary);
  border-radius: 3rem;
  margin-right: 8%;
  margin-bottom: 10%;
  margin-left: 8%;
  min-height: 40rem;
}
.sidebar-menu,
.sidebar-menu  a {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  list-style: none;
  align-items: flex-start;
}

.sidebar-menu .router-link-active {
  transition: all 0.5s ease;
  cursor: pointer;
  font-size: 1.5rem;
}
/* This css class triggered when clicking options. */
.router-link-active {
  background-color: var(--teritary);
  padding:1.5rem;
  border-radius: 1rem;
}

@media only screen and (max-width: 981px) {
  .sidebar-scroll {
    display: none;
  }
}
</style>
