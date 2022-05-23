<template>
     <div class="notification-pane">
        <slot></slot>
     </div>
</template>

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