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
      <div class="channel-type-public">
        <input type="radio" id="public" value="public" v-model="channelType" />
        <label for="public">Public</label>
      </div>
      <div class="channel-type-private">
        <input
          type="radio"
          id="personal"
          value="personal"
          v-model="channelType"
        />
        <label for="personal">Personal</label>
      </div>   
      <div class="channel-type-bulk">
        <input type="radio" id="bulk" value="bulk" v-model="channelType" />
        <label for="bulk">Bulk Personal</label>
      </div>
    </div>
    <Transition>
    <input
      id="receiverAddress"
      v-if="channelType == 'personal'"
      type="text"
      v-model="receiverAddress"
      placeholder="Please Input Receiver Address"
      label="userAddress"
    />
    </Transition>
    <Transition>
    <textarea
      v-model="notification"
      v-if="channelType == 'personal'|| channelType == 'public'"
      placeholder="Please enter the notification"
      style="resize: none"
      id="w3review"
      name="w3review"
    ></textarea>
    </Transition>
    <div class="send-buttons">
      <div v-if="channelType == 'bulk'" class="send-buttons_upload">
        <input type="file" id="fileUpload" @change="extractDataCsv($event)" hidden/>
        <label for="fileUpload" type="button" class="upload-button">Upload</label>
        <span>{{csvFileName}}</span>
      </div>
      <button @click.prevent="sendNotification">Send Notification</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";
import Papa from 'papaparse';
export default {
  data() {
    return {
      channelType: "",
      selectedChannel: "Select One Channel",
      notification: "",
      filters: [],
      receiverAddress: "",
      bulkImport:"",
      csvFileName:"None",
      csvFile:"",
      csvFileContent: [],
      parsed: false
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
      }else if (this.channelType == "bulk"){
        store.dispatch("sendPersonalNotification", {
          address: this.userAddress,
          receiverAddress: this.receiverAddress,
          channelName: this.selectedChannel,
          notification: this.notification,
        });
      }
    },
    extractDataCsv(event){
      this.parsed = false;
      this.csvFileName = event.target.files[0].name;
      this.csvFile = event.target.files[0];
      this.parseFile();
    },
    parseFile(){
      Papa.parse( this.csvFile, {
          header: true,
          skipEmptyLines: true,
          complete: function(results){
              this.csvFileContent = results.data;
              this.parsed = true;
          }.bind(this)
      } );
    }
  },
  created() {
    store.dispatch("getChannelList");
  },
};
</script>
<style scoped>
:root{
  --radio: #7C96B2;
  --radio-checked: #4F29F0;
  --radio-size: 50px;
  --background: #ffffff;
}
.send-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 60rem;
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

.channel-type-private {
  padding-left: 3rem;
}

.channel-type-bulk{
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
.send-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}
button, .upload-button {
  background: var(--teritary);
  border: var(--teritary);
  padding: 1rem;
  border-radius: 0.8rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.send-buttons_upload{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
input[type=radio] {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: var(--primary);
  position: relative;
  height: 1.75em;
  width: 1.75em;
  outline: none;
  margin-right: 0.5em;
  cursor: pointer;
  border: 2px solid var(--teritary);
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  transition: border 0.5s ease;
  transform: translateY(0.5em);
}
input[type=radio]::before,input[type=radio]::after {
  content: "";
  display: flex;
  justify-self: center;
  border-radius: 50%;
  justify-content: center;
}
input[type=radio]::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--primary);
  z-index: 1;
  opacity: var(--opacity, 1);
}
input[type=radio]::after {
  position: relative;
  width: calc(100%);
  height: calc(100%);
  background: var(--teritary);
  top: var(--y, 100%);
  transition: top 0.5s cubic-bezier(0.48, 1.97, 0.5, 0.63);;
}
input[type=radio]:checked {
  --radio: var(--teritary);
}
input[type=radio]:checked::after {
  --y: 0%;
  -webkit-animation: stretch-animate 0.3s ease-out 0.17s;
          animation: stretch-animate 0.3s ease-out 0.17s;
}
input[type=radio]:checked::before {
  --opacity: 0;
}
input[type=radio]:checked ~ input[type=radio]::after {
  --y: -100%;
}
input[type=radio]:not(:checked)::before {
  --opacity: 1;
  transition: opacity 0s linear 0.5s;
}

@-webkit-keyframes stretch-animate {
  0% {
    transform: scale(1, 1);
  }
  28% {
    transform: scale(1.15, 0.85);
  }
  50% {
    transform: scale(0.9, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes stretch-animate {
  0% {
    transform: scale(1, 1);
  }
  28% {
    transform: scale(1.15, 0.85);
  }
  50% {
    transform: scale(0.9, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
