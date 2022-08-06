<template>
  <div class="channel-card">
    <div @click="channelOptin" class="optin">Opt-In</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      channelAddress: "",
    };
  },
  computed: {
    ...mapGetters(["userAddress"]),
  },
  methods: {
    channelOptin() {
      store.dispatch("channelOptin", this.userAddress);
    },
  },
};
</script>

<style scoped>
.channel-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: auto;
  margin-bottom: 2rem;
  background-color: var(--primary);
  border-radius: 0.6rem;
  padding: 3% 2% 3% 2%;
}
.channel-card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.optin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  cursor: pointer;
}

@media only screen and (max-width: 981px) {
  .optin {
    width: 7rem;
    height: 3rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}

@media only screen and (max-width: 580px) {
  .channel-card {
    flex-direction: column;
    align-items: center;
  }

  .optin {
    width: 7rem;
    height: 3rem;
    border-radius: 0.6rem;
    background-color: var(--teritary);
    cursor: pointer;
  }
}
</style>
