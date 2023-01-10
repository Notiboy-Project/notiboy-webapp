<template>
  <transition name="modal-fade">
    <div class="wallet-backdrop">
      <div class="wallet-pane">
        <div class="wallet-header">
          <p class="connect-heading">Who are you?</p>
        </div>
        <div>
          <div class="channel-type">
            <div class="channel-type-public">
              <input
                type="radio"
                id="creator"
                value="creator"
                v-model="userType"
              />
              <label for="public">Creator</label>
            </div>
            <div class="channel-type-private">
              <input type="radio" id="user" value="user" v-model="userType" />
              <label for="personal">User</label>
            </div>
          </div>
        </div>
        <div class="wallet-row1">
          <div @click="storeUserType" class="wallet">
            <p>Continue</p>
          </div>
        </div>
        <div style="padding-bottom: 20px">
          <p style="font-size: 1.5rem; color: white; text-align: center">
            Note: An address cannot simultaneously be <br />
            channel creator (send notification) & user (receive notification).
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "../store";
import router from "../router";

export default {
  data() {
    return {
      wallet: [],
      selectedAddress: "",
      userType: "user",
    };
  },
  methods: {
    storeUserType() {
      localStorage.setItem("usertype", this.userType);
      store.commit("updateUserType", this.userType);
      if (this.userType == "user") {
        router.push({ name: "PersonalNotification" });
      } else if (this.userType == "creator") {
        router.push({ name: "SendNotification" });
      }
      store.commit("addRemoveUserSelectOverlay");
    },
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
  z-index: 2;
}
/* Notification Pane */
.wallet-pane {
  background: var(--primary);
  border-radius: 3rem;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 40%;
  min-height: 60vh;
}
.wallet-header {
  display: flex;
  margin-top: 5%;
  justify-content: center;
}
.wallet-close {
  display: flex;
  justify-content: flex-end;
}
.wallet-close .closebtn {
  font-size: 5rem;
  text-decoration: none;
  cursor: pointer;
  color: var(--teritary);
  border: none;
  background: transparent;
}
.connect-heading {
  color: #ffffff;
  font-size: 3rem;
  padding: 1% 0;
}
.wallet-row1 {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  color: #ffffff;
  width: 100%;
  padding-top: 40px;
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
  transition: opacity 0.5s ease;
}

.channel-type {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
}

input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: var(--primary);
  position: relative;
  height: 1.75em;
  width: 1.75em;
  outline: none;
  margin-right: 0.5em;
  cursor: pointer;
  border: 2px solid var(--teritary);
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  transition: border 0.5s ease;
  transform: translateY(0.5em);
}
input[type="radio"]::before,
input[type="radio"]::after {
  content: "";
  display: flex;
  justify-self: center;
  border-radius: 50%;
  justify-content: center;
}
input[type="radio"]::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--primary);
  z-index: 1;
  opacity: var(--opacity, 1);
}
input[type="radio"]::after {
  position: relative;
  width: calc(100%);
  height: calc(100%);
  background: var(--teritary);
  top: var(--y, 100%);
  transition: top 0.5s cubic-bezier(0.48, 1.97, 0.5, 0.63);
}
input[type="radio"]:checked {
  --radio: var(--teritary);
}
input[type="radio"]:checked::after {
  --y: 0%;
  -webkit-animation: stretch-animate 0.3s ease-out 0.17s;
  animation: stretch-animate 0.3s ease-out 0.17s;
}
input[type="radio"]:checked::before {
  --opacity: 0;
}
input[type="radio"]:checked ~ input[type="radio"]::after {
  --y: -100%;
}
input[type="radio"]:not(:checked)::before {
  --opacity: 1;
  transition: opacity 0s linear 0.5s;
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
    min-height: 60vh;
  }
  .wallet-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .connect-heading {
    color: #ffffff;
    font-size: 3.5rem;
    padding: 1% 0;
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
  }
  .connect-heading {
    color: #ffffff;
    font-size: 3rem;
    padding: 2% 0;
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
