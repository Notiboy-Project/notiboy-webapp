<template>
  <main-pane>
    <search-bar v-if="searchBarStatus == true"></search-bar>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    <div class="channel-main">
      <router-view v-if="connectionStatus == 'Disconnect'"></router-view>
      <!-- Dummy Text while not connected & a div for spacing -->
      <div
        v-if="
          //(searchBarStatus == true) &&
          connectionStatus == 'Connect'
        "
        style="margin-top: 90px"
      ></div>
      <blank-page v-if="connectionStatus == 'Connect'"></blank-page>
    </div>
    <!-- Notification footer -->
    <div class="notification-footer"></div>
  </main-pane>
</template>

<script>
import { mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import BlankPage from "@/components/DummyText.vue";
export default {
  data() {
    return {
      fullPage: false,
    };
  },
  computed: {
    ...mapGetters(["connectionStatus", "searchBarStatus"]),
  },
  props: ["selection"],
  components: {
    searchBar: SearchBar,
    blankPage: BlankPage,
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
};
</script>

<style scoped>
/* Notification Pane */
.notification-pane {
  background: var(--secondary);
  border-radius: 3rem;
  margin-right: 8%;
  margin-bottom: 4%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.channel-main {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  font-size: 1.3rem;
  color: white;
}

@media only screen and (max-width: 981px) {
  .notification-pane {
    margin-right: 1%;
  }
}

@media only screen and (max-width: 526px) {
  .notification-pane {
    margin-right: 1%;
  }
}
</style>
