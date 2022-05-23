<template>
  <main-pane>
    <!-- Search bar  -->
    <search-bar></search-bar>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    <noti-card></noti-card>
    <!-- Notification footer -->
    <div class="notification-footer"></div>
  </main-pane>
</template>

<script>
import Searchbar from '@/components/Searchbar.vue' 
import Noticard from '@/components/Noticard.vue'
export default {
	components: {
		searchBar:Searchbar,
		notiCard:Noticard
  	},
}
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