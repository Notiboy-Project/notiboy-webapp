<template>
  <div v-show="userType == 'user'" class="guide">
    <div class="guide-heading">
      <h1>User Guide</h1>
    </div>
    <div class="guide-list">
      <p>Step 1: Connect Wallet.</p>
      <p>
        Step 2: Select user. An address can be either creator or user. Cannot be
        both simultaneously.
      </p>
      <p>
        Step 3: Global Opt-in. It creates a box space for the user where the
        personal notifications will be stored. <br />
        Registration fee is 5 Algo.
      </p>
      <p>
        Step 4: Opt-in to channels so that they can send you personal
        notifications. Opt-in only to verified channels.
      </p>
      <p>Step 5: Check broadcasts to see public notifications.</p>
      <p>Step 6: Check notibox for personal notifications.</p>
    </div>
  </div>
  <div v-show="userType == 'creator'" class="guide">
    <div class="guide-heading">
      <h1>Creator Guide</h1>
    </div>
    <div class="guide-list">
      <p>Step 1: Connect Wallet.</p>
      <p>
        Step 2: Select creator. An address can be either creator or user. Cannot
        be both simultaneously.
      </p>
      <p>
        Step 3: Go to channel Section. Enter channel name and create a channel.
        <br />
        Channel creation involves creating a placeholder smart contract which
        increases your minimum balance requirement. You need 25 USDCa in your
        address to complete the channel creation process.
      </p>
      <p>
        Step 4: Go to send notifications, select the type and send
        notifications.
      </p>
      <p>
        <b>Note : </b>Make sure you have at least 6 Algo of available balance
        and 25 USDCa in your address before creating a channel. If you are a
        developer you can utilize our JS SDK for all these operations.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userType"]),
  },
};
</script>

<style scoped>
.guide {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.guide-list {
  font-size: 14px;
  line-height: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
