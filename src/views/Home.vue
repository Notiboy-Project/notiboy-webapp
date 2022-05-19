<template>
  <!-- Home view which consist of header, notification pane, sidebar -->
  <div class="home">
    <main-header></main-header>
    <div class="notification-container">
      <main-sidebar></main-sidebar>
      <main-pane></main-pane>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Pane from "@/components/Pane.vue";

export default {
  components: {
    mainHeader: Header,
    mainSidebar: Sidebar,
    mainPane: Pane,
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
