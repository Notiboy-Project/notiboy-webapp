<template>
  <div class="notification-pane">
    <!-- Search bar  -->
    <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?">
      <button type="submit" class="searchButton">
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png"/>
      </button>
    </div>
    <!-- <div class="notification-header"></div> -->
    <!-- Notification area which will be injected with notification cards -->
    
    <!-- Notification footer -->
    <div class="notification-footer"></div>
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
  
.searchTerm:focus{
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
</style>