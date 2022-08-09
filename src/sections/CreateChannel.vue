<template>
  <div class="create-card">
    <input
      class="channel-name"
      v-model="channelName"
      maxlength="20"
      placeholder="Channel Name"
    />
    <!-- <div class="channel-type">
      <div class="channel-type-private">
        <input
          type="radio"
          id="private"
          value="private"
          v-model="channelType"
        />
        <label for="private">Private</label>
      </div>
      <div class="channel-type-public">
        <input type="radio" id="public" value="public" v-model="channelType" />
        <label for="public">Public</label>
      </div>
    </div> -->
    <button @click.prevent="createChannel">Create Channel</button>

    <p style="text-align: center">
      Note: Personal notifications and public notifications can be sent from the created channels.
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      channelName: "",
      address: this.updatedAddress,
      connection: this.connectionStatus
    };
  },
  computed: {
    ...mapGetters(["userAddress", "connectionStatus"]),
  },
  methods: {
    createChannel() {
      store.dispatch('createChannel',{
        name:this.channelName,
        address: this.userAddress
      })
    },
  },
};
</script>
<style scoped>
.create-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50rem;
  padding-top: 8rem;
  padding-bottom: 5rem;
  font-weight: bold;
}

input.channel-name {
  font-weight: bold;
  width: 30rem;
  height: 4rem;
  color: white;
  border: 2px solid var(--tertiary);
  border-radius: 0.5rem;
  background-color: var(--primary);
  padding-left: 0.6rem;
}

input.channel-name :focus {
  border: 1px solid var(--tertiary);
}

input:focus,
input.form-control:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

button {
  background: var(--teritary);
  border: var(--teritary);
  padding: 1rem;
  border-radius: 0.8rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
