<template>
    <div class="channel-main">
      <div class="channel-card">
        <div class="channel-card-name">
          <p class="channel-name">AoA</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <div class="optin">Opt-In</div>
      </div>
      <div class="channel-card">
        <div class="channel-card-name">
          <p class="channel-name">Angrypenguins NFT</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <div class="optin">Opt-Out</div>
      </div>
      <div class="channel-card">
        <div class="channel-card-name">
          <p class="channel-name">Rand Labs</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <div class="optin">Opt-In</div>
      </div>
      <div class="channel-card">
        <div class="channel-card-name">
          <p class="channel-name">Rand Labs</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <div class="optin">Opt-In</div>
      </div>
      <div class="channel-card">
        <div class="channel-card-name">
          <p class="channel-name">Rand Labs</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <div class="optin">Opt-In</div>
      </div>
    </div>
</template>

<style scoped>
.channel-main{
    width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	font-size: 1.2rem;
	color: white;
}

.channel-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: auto;
	margin-bottom: 2rem;
	background-color:  var(--primary);
	border-radius: 0.6rem;
    padding: 3% 2% 3% 2%;
}

.channel-card-name{
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
  align-items: center;
}

.optin{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 50%;
  border-radius: 0.6rem;
  background-color: var(--teritary);
  cursor: pointer;
}
</style>