<template>
  <div class="create-card">
    <input
      v-if="userAppIndex.channelAppIndex == 0"
      class="channel-name"
      v-model="channelName"
      maxlength="10"
      placeholder="Channel Name"
    />
    <h2 style="line-height: 30px" v-if="userAppIndex.channelAppIndex != 0">
      Id: {{ userAppIndex.channelAppIndex }}<br />
      Name: {{ userAppIndex.channelName }}
    </h2>
    <button
      v-if="userAppIndex.channelAppIndex == 0 && this.channelName.length > 0"
      @click.prevent="createChannel"
    >
      Create Channel
    </button>
    <button
      v-if="
        userAppIndex.channelAppIndex != 0 &&
        this.subscriberList.length > 0 &&
        this.subscriberList[0].length == 58
      "
      @click.prevent="downloadCSVData"
    >
      Download Subscriber List
    </button>
    <button
      v-if="userAppIndex.channelAppIndex != 0"
      @click.prevent="deleteChannel"
    >
      Delete Channel
    </button>
    <p
      v-if="userAppIndex.channelAppIndex == 0"
      style="text-align: center; line-height: 25px"
    >
      Note: Enter channel name. Channel name limited to 10 english characters.
      <br />
      Cost of creating a channel is 25 USDCa.
    </p>
    <p v-if="userAppIndex.channelAppIndex != 0" style="text-align: center">
      Note: Deleting the channel will remove the records from Notiboy Smart
      Contract.
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
      connection: this.connectionStatus,
      unParsed: false,
      csvFileContent: [],
    };
  },
  computed: {
    ...mapGetters([
      "userAddress",
      "connectionStatus",
      "userAppIndex",
      "subscriberList",
    ]),
  },
  methods: {
    createChannel() {
      if (this.channelName.length < 1) return;
      store.dispatch("createChannel", {
        name: this.channelName,
        address: this.userAddress,
      });
    },
    deleteChannel() {
      store.dispatch("deleteChannel", {
        appIndex: this.userAppIndex.channelAppIndex,
        address: this.userAddress,
      });
    },
    downloadCSVData() {
      let array = this.subscriberList;
      let csv = array.join("\n");
      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "subscriberList.csv";
      anchor.click();
    },
  },

  created() {
    if (this.userAddress.length === 58) {
      store.dispatch("getAppIndexFromAddress");
      if (this.userAppIndex.channelAppIndex != 0)
        store.dispatch("getsubscriberList", this.userAppIndex.channelAppIndex);
    }
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
  width: 20rem;
  height: 4rem;
  color: white;
  border: 2px solid var(--tertiary);
  border-radius: 0.5rem;
  background-color: var(--primary);
  padding-left: 0.6rem;
  text-align: center;
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
