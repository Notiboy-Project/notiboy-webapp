<template>
  <div class="wallet-pane">
    <div class="connect-heading">Connect Your Wallet</div>
 
        <div class="wallet-row1">
            <div class="wallet">
                <img src="../assets/myalgobutton.svg" alt="My Algo Button">
                <p>My Algo Wallet</p>
            </div>
            <div class="wallet">
                <img src="../assets/pera.png" width="30px" height="30px" alt="Pera Button">
                <p>Pera Wallet</p>
            </div>
        </div>
        <div class="wallet-row2">
            <div class="wallet">
                 <img src="../assets/algosigner.jpg" width="30px" height="30px" alt="Algo Signer">
                <p>Algo Signer</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Notification Pane */
.wallet-pane {
	background: var(--secondary);
	border-radius: 3rem;
	margin-right: 8%;
	margin-bottom: 4%;
	margin-left: 1%;
	display: flex;
	flex-direction: column;
    justify-content: space-evenly;
	align-items: center;
	overflow: hidden;
    min-height: 60vh;
}

.connect-heading{
    color: #ffffff;
    font-size: 5rem;
    padding: 2% 0;
}

.wallet-row1{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    width: 80%;
}

.wallet-row2{
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ffffff;
}

.wallet{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 0.3rem solid var(--teritary);
    border-radius: 0.3rem;
    width: 20rem;
    font-size: 1.6rem;
    cursor: pointer;
}

</style>