<template>
 <div class="notification-main">
      <div class="notification-card">
        <div class="notification-card-name">
          <p >Anirand</p>
        </div>
        <p class="notification-card-heading">Rug Number 1</p>
        <p class="notification-card-notification">We are planning for a rug of rugs. This is anirand metaverse of metaverse.
        </p>
        <p class="notification-card-timestamp">12 September 2022</p>
      </div>
      <div class="notification-card">
        <div class="notification-card-name">
          <p >NFD Domains</p>
          <img src="https://img.icons8.com/external-inkubators-blue-inkubators/25/000000/external-verified-ecommerce-user-interface-inkubators-blue-inkubators.png"/>
        </div>
        <p class="notification-card-heading">DAO Voting : Event 1</p>
        <p class="notification-card-notification">The DAO voting will start on Monday. The voting will decide on important features. 
          Make sure you cast your vote to decide on all the important matters regarding DAO.
        </p>
        <p class="notification-card-timestamp">12 September 2022</p>
      </div>
      <div class="notification-card">
        <p>
          This is a rectangle <br />This is a rectangle <br />This is a
          rectangle
        </p>
      </div>
      <div class="notification-card">
        <p>
          This is a rectangle <br />This is a rectangle <br />This is a
          rectangle
        </p>
      </div>
      <div class="notification-card">
        <p>
          This is a rectangle <br />This is a rectangle <br />This is a
          rectangle
        </p>
      </div>
      <div class="notification-card">
        <p>
          This is a rectangle <br />This is a rectangle <br />This is a
          rectangle
        </p>
      </div>
    </div>   
</template>

<style scoped>
.notification-main {
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	font-size: 1.3rem;
	color: white;
}
.notification-card {
    width: 80%;
	height: auto;
	margin-bottom: 2rem;
	border: 0.3rem solid var(--teritary);
	border-radius: 0.6rem;
    padding-left: 2%;
    padding-right:2%;
}

.notification-card-name{
    display: flex;
    font-size: 1.6rem;
    font-weight: bold;
    align-items: center; 
}

.notification-card-name >img{
    width: 25px;
    height: 25px;
}

.notification-card-heading{
    font-size: 1.4rem;
    font-weight: bold;
}

.notification-card-notification{
    font-size: 1.3rem;
}

.notification-card-timestamp{
    padding-left: 80%;
}

@media only screen and (max-width: 1300px) {
	.notification-card-timestamp{
    padding-left: 75%;
  }
}
@media only screen and (max-width: 1045px) {
	.notification-card-timestamp{
    padding-left: 70%;
  }
}
@media only screen and (max-width: 630px) {
	.notification-card-timestamp{
    padding-left: 50%;
  }
}

@media only screen and (max-width: 400px) {
	.notification-card-timestamp{
    padding-left: 35%;
  }
}

</style>