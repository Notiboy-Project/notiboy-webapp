<template>
  <div class="notification-card">
    <p class="notification-card-notification">
      {{ notification.notification }}
    </p>
    <p class="notification-card-timestamp">{{ notificationTime }}</p>
  </div>
</template>
<script>
export default {
  props: {
    notification: Object,
  },
};
</script>
<style scoped>
.notification-card {
  width: 80%;
  height: auto;
  margin-bottom: 2rem;
  border: 0.3rem solid var(--teritary);
  border-radius: 0.6rem;
  padding-left: 2%;
  padding-right: 2%;
}

.notification-card-notification {
  font-size: 1.3rem;
  margin: 3.5rem 0;
}

.notification-card-timestamp {
  padding-left: 80%;
}
</style>
