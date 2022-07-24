<template>
  <div class="send-card">
    <select v-model="selectedChannel" class="channel-name" name="selectedValue">
      <option disabled>Select One Channel</option>
      <option v-for="item in filters" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <textarea style="resize: none" id="w3review" name="w3review">
The governance vote session for DAO starting this month.</textarea
    >
    <button @click.prevent="createChannel">Send Notification</button>

    <p style="text-align: center">
      Note: Notifications you send are stored on a public blockchain.
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channelName: "",
      channelType: "",
      selectedChannel: "Select One Channel",
      filters: [],
    };
  },

  methods: {
    createChannel() {
      console.log("channel created");
    },
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
textarea {
  background-color: var(--primary);
  color: white;
  width: 30rem;
  height: 10rem;
  max-width: 30rem;
  max-height: 10rem;
  border-color: var(--primary);
  border-radius: 1rem;
  font-family: "Sora", sans-serif;
  font-size: 1.4rem;
  text-align: center;
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
