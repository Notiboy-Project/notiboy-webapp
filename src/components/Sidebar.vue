<template>
  <div class="sidebar-scroll">
    <ul class="sidebar-menu">
      <li>Noti Box</li>
      <li class="sidebar-clicked">Public Channels</li>
      <li>Private Channels</li>
      <li>Create Channel</li>
      <li>Send Notification</li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-scroll{
	display: flex;
	background: var(--secondary);
	border-radius: 3rem;
	margin-right: 8%;
	margin-bottom: 10%;
	margin-left: 8%;
	min-height: 40rem;
}
.sidebar-menu {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: space-around;
	color: white;
	list-style: none;
	align-items: flex-start;
}
  
.sidebar-menu li {
	cursor: pointer;
	font-size: 1.5rem;
	transition: font-size 0.5s ease;
}

.sidebar-menu li:hover{
	font-size: 1.7rem;
}

.sidebar-clicked{
  background-color: var(--teritary);
  padding: 1.5rem;
  border-radius: 1rem;
}
</style>