<template>
  <div class="create-card">
    <div class="counter-display">
      <div v-if="userType == 'creator'">
        <h2>Public</h2>
        <p class="counter-number">
          {{ notificationCounter.publicNotification }}
        </p>
      </div>
      <div v-if="userType == 'creator'" class="counter-right">
        <h2>Personal</h2>
        <p class="counter-number">
          {{ notificationCounter.personalNotification }}
        </p>
      </div>
    </div>
    <div v-if="userType == 'user'">
      <h2>Personal</h2>
      <p class="counter-number">
        {{ notificationCounter.personalNotification }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";
export default {
  computed: {
    ...mapGetters([
      "userAddress",
      "connectionStatus",
      "userType",
      "notificationCounter",
    ]),
  },
  created() {
    store.dispatch("getCounter", this.userAddress);
  },
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
.counter-display {
  display: flex;
  justify-content: space-between;
}
.counter-number {
  font-size: 50px;
  text-align: center;
}
.counter-right {
  margin-left: 50px;
}
</style>
