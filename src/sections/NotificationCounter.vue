<template>
  <div class="create-card">
    <h2 v-if="userType == 'creator'">
      Public Notifications Sent: {{ notificationCounter.publicNotification }}
    </h2>
    <h2 v-if="userType == 'creator'">
      Personal Notifications Sent: {{ notificationCounter.personalNotification }}
    </h2>
    <h2 v-if="userType == 'user'">
      Personal Notifications Received: {{ notificationCounter.personalNotification }}
    </h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapGetters(["userAddress", "connectionStatus", "userType","notificationCounter"]),
  },
  created(){
    store.dispatch("getCounter",this.userAddress);
  }
};
</script>
<style scoped>
.create-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50rem;
  padding-top: 8rem;
  padding-bottom: 5rem;
  font-weight: bold;
}
</style>
