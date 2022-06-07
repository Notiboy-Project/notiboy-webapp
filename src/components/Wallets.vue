<template>
  <div class="wallet-pane">
    <div class="connect-heading">Connect Your Wallet</div>

    <div class="wallet-row1">
      <div @click="MyAlgoLogin" class="wallet">
        <img src="../assets/myalgobutton.svg" alt="My Algo Button" />
        <p>My Algo Wallet</p>
      </div>
      <div @click="connectPeraWallet" class="wallet">
        <img
          src="../assets/pera.png"
          width="30"
          height="30"
          alt="Pera Button"
        />
        <p>Pera Wallet</p>
      </div>
      <!-- <div @click="AlgoSignerConnect" class="wallet">
        <img
          src="../assets/algosigner.jpg"
          width="30"
          height="30"
          alt="Algo Signer"
        />
        <p>Algo Signer</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import router from "../router";
const peraWallet = new PeraWalletConnect();

export default {
  data() {
    return {
      wallet: [],
      selectedAddress: "",
    };
  },
  methods: {
    //Method extracts the address from the response of my algo wallet and send it to store
    // AlgoSignerConnect: async (ledger) => {
    //   try {
    //     if (!ledger) ledger = "MainNet";
    //     if (window.AlgoSigner !== undefined) {
    //       await window.AlgoSigner.connect();
    //       let response = await window.AlgoSigner.accounts({
    //         ledger: ledger,
    //       });
    //       console.log(response)
    //     } else {
    //       return false;
    //     }
    //   } catch (err) {
    //     return [];
    //   }
    // },
    //Method to connect with my algo wallet
    MyAlgoLogin: async () => {
      try {
        const myAlgoConnect = new MyAlgoConnect();
        let response = await myAlgoConnect.connect();
        let address = response[0].address;
        localStorage.setItem("address", address);
        router.replace({ name: "Dashboard" });
      } catch (err) {
        return [];
      }
    },
    //Method to connect via pera wellet
    connectPeraWallet() {
      peraWallet.connect().then((accounts) => {
        let account = accounts[0];
        localStorage.setItem("address", account);
        router.replace({ name: "Dashboard" });
      });
    },
  },
};
</script>

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

.connect-heading {
  color: #ffffff;
  font-size: 5rem;
  padding: 2% 0;
}

.wallet-row1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  color: #ffffff;
  width: 80%;
}

.wallet {
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
  .connect-heading {
    color: #ffffff;
    font-size: 3.5rem;
    padding: 2% 0;
  }
  .wallet-row1 {
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
  .connect-heading {
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
  .connect-heading {
    color: #ffffff;
    font-size: 2.3rem;
    padding: 2% 0;
  }
}

@media only screen and (max-width: 480px) {
  .wallet-pane {
    background: var(--secondary);
    width: 100%;
    border-radius: 3rem;
    margin-bottom: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .connect-heading {
    color: #ffffff;
    font-size: 1.8rem;
    padding: 2% 0;
  }

  .wallet {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 0.3rem solid var(--teritary);
    border-radius: 0.3rem;
    width: 15rem;
    font-size: 1.3rem;
    cursor: pointer;
    margin-bottom: 8%;
  }
}
</style>
