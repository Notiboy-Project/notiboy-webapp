<template>
  <div class="sidebar-scroll">
    <ul class="sidebar-menu">
      <router-link
        v-show="userType == 'user' && connectionStatus == 'Disconnect'"
        :to="{ name: 'PersonalNotification' }"
      >
        Noti Box
      </router-link>
      <router-link
        v-show="userType == 'user' && connectionStatus == 'Disconnect'"
        :to="{ name: 'Channels' }"
      >
        Channels
      </router-link>
      <router-link
        v-show="userType == 'creator' && connectionStatus == 'Disconnect'"
        :to="{ name: 'SendNotification' }"
      >
        Send Notification
      </router-link>
      <router-link
        v-show="userType == 'creator' && connectionStatus == 'Disconnect'"
        :to="{ name: 'CreateChannel' }"
      >
        Create Channel
      </router-link>
      <router-link
        v-show="
          (userType == 'creator' || userType == 'user') &&
          connectionStatus == 'Disconnect'
        "
        :to="{ name: 'NotificationCounter' }"
      >
        Notification Counter
      </router-link>
      <img
        v-show="connectionStatus == 'Connect'"
        style="width: 200px"
        src="../assets/algorand_white.png"
        alt="Algorand"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userType", "connectionStatus"]),
  },
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
.sidebar-menu a {
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
  padding: 1.5rem;
  border-radius: 1rem;
}

@media only screen and (max-width: 981px) {
  .sidebar-scroll {
    display: none;
  }
}
</style>
