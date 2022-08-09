<template>
  <div class="send-card">
    <select v-model="selectedChannel" class="channel-name" name="selectedValue">
      <option disabled>Select One Channel</option>
      <option
        v-for="channel in userOwnedChannels"
        :key="channel.channelName"
        :value="channel.channelName"
      >
        {{ channel.channelName }}
      </option>
    </select>
    <div class="channel-type">
      <div class="channel-type-private">
        <input
          type="radio"
          id="personal"
          value="personal"
          v-model="channelType"
        />
        <label for="personal">Personal</label>
      </div>
      <div class="channel-type-public">
        <input type="radio" id="public" value="public" v-model="channelType" />
        <label for="public">Public</label>
      </div>
    </div>
    <input
      id="receiverAddress"
      v-if="channelType == 'personal'"
      type="text"
      v-model="receiverAddress"
      placeholder="Please Input Receiver Address"
      label="userAddress"
    />

    <textarea
      v-model="notification"
      placeholder="Please enter the notification"
      style="resize: none"
      id="w3review"
      name="w3review"
    ></textarea>
    <button @click.prevent="sendNotification">Send Notification</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      channelType: "",
      selectedChannel: "Select One Channel",
      notification: "",
      filters: [],
      receiverAddress: "",
    };
  },

  computed: {
    ...mapGetters(["userAddress", "channels"]),
    userOwnedChannels() {
      return this.channels.filter((channel) => {
        return channel.dappAddress.includes(this.userAddress);
      });
    },
  },

  methods: {
    sendNotification() {
      if (this.channelType == "public") {
        store.dispatch("sendPublicNotification", {
          address: this.userAddress,
          channelName: this.selectedChannel,
          notification: this.notification,
        });
      } else if (this.channelType == "personal") {
        store.dispatch("sendPersonalNotification", {
          address: this.userAddress,
          receiverAddress: this.receiverAddress,
          channelName: this.selectedChannel,
          notification: this.notification,
        });
      }
    },
  },

  created() {
    store.dispatch("getChannelList");
  },
};
</script>
<style scoped>
.send-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50rem;
  padding-top: 8rem;
  padding-bottom: 5rem;
  font-weight: bold;
}

select.channel-name {
  width: 31rem;
  height: 4rem;
  background-color: var(--primary);
  border: 2px solid var(--tertiary);
  border-radius: 0.5rem;
  background-color: var(--primary);
  background: url(https://img.icons8.com/external-those-icons-lineal-color-those-icons/16/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png)
    no-repeat right var(--primary);
  background-position-x: 27rem;
  -webkit-appearance: none;
  color: white;
  font-family: "Sora", sans-serif;
  padding-left: 1.5rem;
}

select option {
  background: var(--primary);
  color: #fff;
}
.channel-type {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.channel-type-public {
  padding-left: 3rem;
}

#receiverAddress {
  background-color: var(--primary);
  border-color: var(--primary);
  border-radius: 0.5rem;
  font-family: "Sora", sans-serif;
  color: white;
  width: 30rem;
  height: 3rem;
}

textarea {
  background-color: var(--primary);
  color: white;
  width: 30rem;
  height: 6rem;
  max-width: 30rem;
  max-height: 6rem;
  border-color: var(--primary);
  border-radius: 1rem;
  font-family: "Sora", sans-serif;
  font-size: 1.4rem;
  text-align: center;
  padding-top: 15px;
}

input.channel-name {
  font-weight: bold;
  width: 30rem;
  height: 10rem;
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
input.form-control:focus,
textarea,
select:active,
select:focus {
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
