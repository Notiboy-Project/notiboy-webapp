<template>
  <transition name="modal-fade">
    <div class="wallet-backdrop">
      <div class="wallet-pane">
        <div class="wallet-header">
          <p class="connect-heading">Connect Your Wallet</p>
          <!-- Button to close the Wallet Connect -->
          <button type="button" class="closebtn" @click="closeConnectOverlay">&times;</button>
        </div>
        <div class="wallet-row1">
          <div @click="myAlgoConnect" class="wallet">
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
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { PeraWalletConnect } from "@perawallet/connect";
const peraWallet = new PeraWalletConnect();
import store from '../store'

export default {
  data() {
    return {
      wallet: [],
      selectedAddress: "",
    };
  },
  methods: {
    async myAlgoConnect(){
      if(this.MyAlgoLogin && typeof this.MyAlgoLogin === 'function'){
        await this.MyAlgoLogin();
      }
      this.closeConnectOverlay();
    },
    //Method to connect with my algo wallet
    MyAlgoLogin: async () => {
      try {
        const myAlgoConnect = new MyAlgoConnect();
        const response = await myAlgoConnect.connect();
        const address = response[0].address;
        localStorage.setItem("notiboy_address", address);
        store.dispatch("updateAddress");
      } catch (err) {
        return [];
      }
    },
    //Method to connect via pera wellet
    connectPeraWallet() {
      peraWallet.connect().then((accounts) => {
        const address= accounts[0];
        localStorage.setItem("notiboy_address", address);
        store.dispatch("updateAddress");
        this.$emit("closeConnectOverlay");
      });
    },
    // Emit Event to close the wallet connect Overlay
    closeConnectOverlay(){
      this.$emit("closeConnectOverlay")
    }
  },
};
</script>

<style scoped>
/* Wallet model backdrop */
.wallet-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(7, 7, 7, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
/* Notification Pane */
.wallet-pane {
  background: var(--primary);
  border-radius: 3rem;
  margin-right: 2%;
  margin-bottom: 2%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 60vh;
}
.wallet-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wallet-header .closebtn {
  font-size: 6rem;
  text-decoration: none;
  cursor: pointer;
  color: var(--teritary);
  border: none;
  background: transparent;
}
.connect-heading {
  color: #ffffff;
  font-size: 3rem;
  padding: 2% 0;
  margin-right: 5rem;
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
  width: 25rem;
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: 8%;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}

@media only screen and (max-width: 980px) {
  .wallet-pane {
    background: var(--primary);
    width: 60%;
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
  .wallet-header{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .connect-heading {
    color: #ffffff;
    font-size: 3.5rem;
    padding: 2% 0;
  }
  .wallet-header .closebtn {
    font-size: 4rem;
    text-decoration: none;
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
    background: var(--primary);
    width: 70%;
    border-radius: 3rem;
    margin-right: 1%;
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
    background: var(--primary);
    width: 80%;
    border-radius: 3rem;
    margin-right: 3%;
    margin-bottom: 1%;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .connect-heading {
    color: #ffffff;
    font-size: 2.5rem;
    padding: 2% 0;
  }
}

@media only screen and (max-width: 480px) {
  .wallet-pane {
    background: var(--primary);
    width: 100%;
    border-radius: 3rem;
    margin-bottom: 1%;
    margin-right: 1%;
    margin-left: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .connect-heading {
    color: #ffffff;
    font-size: 2.5rem;
    padding: 2% 0;
  }
  .wallet-header .closebtn {
    font-size: 5rem;
    text-decoration: none;
  }
  .wallet {
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
