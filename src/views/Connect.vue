<template>
  <div class="connect">
    <main-header></main-header>
    <div class="connect-container">
      <div></div>
      <wallet-connect></wallet-connect>
      <div></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Wallets from "@/components/Wallets.vue";

export default {
  components: {
    walletConnect: Wallets,
  },
};
</script>

<style scoped>
.connect {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.connect-container {
  display: grid;
  min-height: 80%;
  grid-template-columns: 1fr 3fr 1fr;
}
</style>
