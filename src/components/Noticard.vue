<template>
  <div class="notification-card">
    <div class="notification-card-name">
      <p>{{notification.channel}}</p>
      <img v-if="notification.verified==true"
        src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"
      />
    </div>
    <p class="notification-card-heading">{{notification.title}}</p>
    <p class="notification-card-notification">
      {{notification.text}}
    </p>
    <p class="notification-card-timestamp">{{notification.date}}</p>
  </div>
</template>
<script>
export default {
  props:{
    notification: Object
  }     
}
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

.notification-card-name {
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  align-items: center;
}

.notification-card-name > img {
  width: 25px;
  height: 25px;
}

.notification-card-heading {
  font-size: 1.4rem;
  font-weight: bold;
}

.notification-card-notification {
  font-size: 1.3rem;
}

.notification-card-timestamp {
  padding-left: 80%;
}

@media only screen and (max-width: 1300px) {
  .notification-card-timestamp {
    padding-left: 75%;
  }
}
@media only screen and (max-width: 1045px) {
  .notification-card-timestamp {
    padding-left: 70%;
  }
}
@media only screen and (max-width: 630px) {
  .notification-card-timestamp {
    padding-left: 50%;
  }
}

@media only screen and (max-width: 400px) {
  .notification-card-timestamp {
    padding-left: 35%;
  }
}
</style>
