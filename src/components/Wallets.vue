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
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    color: #ffffff;
    width: 80%;
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
    margin-bottom: 8%;
}

@media only screen and (max-width: 980px) {

    .connect-heading{
        color: #ffffff;
        font-size: 3.5rem;
        padding: 2% 0;
    }
	.wallet-row1{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        width: auto;
    }
}

@media only screen and (max-width: 850px) {

    .wallet-pane {
        background: var(--secondary);
        border-radius: 3rem;
        margin-right: 8%;
        margin-bottom: 1%;
        margin-left: 1%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        min-height: 60vh;
    }
    .connect-heading{
        color: #ffffff;
        font-size: 3rem;
        padding: 2% 0;
    } 
}

@media only screen and (max-width: 580px) {

    .wallet-pane {
        background: var(--secondary);
        border-radius: 3rem;
        margin-right: 8%;
        margin-bottom: 1%;
        margin-left: 1%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .connect-heading{
        color: #ffffff;
        font-size: 2.3rem;
        padding: 2% 0;
    } 
}

@media only screen and (max-width: 480px) {

    .wallet-pane {
        background: var(--secondary);
        border-radius: 3rem;
        margin-right: 8%;
        margin-bottom: 1%;
        margin-left: 1%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .connect-heading{
        color: #ffffff;
        font-size: 1.8rem;
        padding: 2% 0;
    } 

    .wallet{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border: 0.3rem solid var(--teritary);
        border-radius: 0.3rem;
        width: 20rem;
        font-size: 1.3rem;
        cursor: pointer;
        margin-bottom: 8%;
    }
}
</style>