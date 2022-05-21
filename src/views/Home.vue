<template>
  <!-- Home view which consist of header, notification pane, sidebar -->
  <div class="home">
    <main-header @nav-opened="navStatus = true"></main-header>
    <mobile-overlay @nav-closed="navStatus = false" :nav-overlay="navStatus"></mobile-overlay>
    <div class="notification-container">
      <main-sidebar @pane-selection="changePane"></main-sidebar>
      <notification-pane v-if="currentPane == 'notification'"></notification-pane>
      <public-pane v-if="currentPane == 'public'"></public-pane>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import PublicPane from "@/components/PublicPane.vue";
import Overlay from "@/components/Overlay.vue";

export default {
  data(){
    return{
      navStatus: false,
      currentPane: 'public'
    }
  },

  methods:{
    changePane(changevar){
      console.log(changevar)
      if(changevar == 'noticlick'){
        this.currentPane = 'notification'
      }else if(changevar == 'publicclick'){
        this.currentPane = 'public'
      }
    }
  },

  components: {
    mainHeader: Header,
    mainSidebar: Sidebar,
    notificationPane: NotificationPane,
    publicPane: PublicPane,
    mobileOverlay: Overlay
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100vh;
}
.notification-container {
  display: grid;
  min-height: 80%;
  grid-template-columns: 1fr 3fr;
}

@media only screen and (max-width: 981px) {
	.notification-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
