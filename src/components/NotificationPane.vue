<template>
  <main-pane>
    <!-- Search bar  -->
    <div v-if="selection != 'create'" class="search">
      <input type="text" class="searchTerm" placeholder="Search"/>
      <button type="submit" class="searchButton">
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png" />
      </button>
    </div>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    <div class="channel-main">
    <noti-card v-if="selection =='notification'"></noti-card>
    <channel-card v-if="selection =='public'"></channel-card>
    <create-card v-if="selection == 'create'"></create-card>
    </div>
    <!-- Notification footer -->
    <div class="notification-footer"></div>
  </main-pane>
</template>

<script>
import Noticard from "@/components/NotiCard.vue";
import Public from "@/components/ChannelCard.vue";
import Create from "@/components/CreateCard.vue";
export default {

  props:['selection'],
  components: {
    notiCard: Noticard,
    channelCard: Public,
    createCard: Create,
  }
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
/* Search Bar */
.search {
  width: 25%;
  display: flex;
  margin: 4% 0;
}

.searchTerm {
  width: 100%;
  border: 3px solid var(--primary);
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #ffffff;
  background-color: var(--primary);
  font-family: "Sora", sans-serif;
}

.searchTerm:focus {
  color: #ffffff;
  font-family: "Sora", sans-serif;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid var(--primary);
  background: var(--primary);
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

@media only screen and (max-width: 981px) {
  .notification-pane {
    margin-right: 1%;
  }
  .search {
    width: 40%;
    display: flex;
    margin: 4% 0;
  }
}

@media only screen and (max-width: 526px) {
  .search {
    width: 50%;
    display: flex;
    margin: 4% 0;
  }
  .notification-pane {
    margin-right: 1%;
  }
}

</style>
