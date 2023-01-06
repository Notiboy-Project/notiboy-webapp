import { createStore } from "vuex";
import algosdk from "algosdk";
import Notiboy from "notiboy-js-sdk";
const client = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);
const indexer = new algosdk.Indexer(
  "",
  "https://testnet-idx.algonode.cloud",
  ""
);
const notiboy = new Notiboy(client, indexer);
//Conntecting my algo wallet
import MyAlgoConnect from "@randlabs/myalgo-connect";
const myAlgoWallet = new MyAlgoConnect();
//Connecting Pera wallet
import { PeraWalletConnect } from "@perawallet/connect";
const peraWallet = new PeraWalletConnect();
//Toast Notification
import { createApp } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp({});
app.mount("#app");
const $toast = useToast();

export default createStore({
  state() {
    return {
      address: "",
      searchText: "",
      connectionStatus: "",
      personalNotifications: [],
      publicNotifications: [],
      channels: [],
      searchBarStatus: false,
      loader: false,
      optinState: false,
      searchBarDefaultText:"Search",
      userAppIndex:0
    };
  },
  getters: {
    userAddress(state) {
      return state.address;
    },
    updatedAddress(state) {
      if (state.address == null) {
        return "";
      } else {
        return state.address.slice(0, 5) + "..." + state.address.slice(53, 58);
      }
    },
    searchText(state) {
      return state.searchText;
    },
    connectionStatus(state) {
      return state.connectionStatus;
    },
    personalNotifications(state) {
      return state.personalNotifications;
    },
    publicNotifications(state) {
      return state.publicNotifications;
    },
    channels(state) {
      return state.channels;
    },
    searchBarStatus(state) {
      return state.searchBarStatus;
    },
    searchBarDefaultText(state){
      return state.searchBarDefaultText;
    },
    loader(state) {
      return state.loader;
    },
    optinState(state) {
      return state.optinState;
    },
    userAppIndex(state){
      return state.userAppIndex;
    }
  },
  mutations: {
    selectAddress(state, address) {
      state.address = address;
    },
    disconnect(state) {
      state.address = null;
      state.connectionStatus = "Connect";
    },
    searchTextUpdate(state, searchText) {
      state.searchText = searchText;
    },
    updateConnectionConnect(state) {
      state.connectionStatus = "Connect";
    },
    updateConnectionDisconnect(state) {
      state.connectionStatus = "Disconnect";
    },
    updateChannelList(state, channelList) {
      state.channels = channelList;
    },
    updatePersonalNotifications(state, personalNotifications) {
      state.personalNotifications = personalNotifications;
    },
    updatePublicNotifications(state, publicNotifications) {
      state.publicNotifications = publicNotifications;
    },
    updateSearchBarStatus(state, status) {
      state.searchBarStatus = status;
    },
    updatesearchBarDefaultText(state,text){
      state.searchBarDefaultText = text;
    },
    updateLoaderTrue(state) {
      state.loader = true;
    },
    updateLoaderFalse(state) {
      state.loader = false;
    },
    updateOptinState(state, optinState) {
      state.optinState = optinState;
    },
    updateUserIndex(state,appIndex){
      state.userAppIndex = appIndex; 
    }
  },
  actions: {
    selectAddress(context, address) {
      context.commit("selectAddress", address);
    },
    updateAddress(context) {
      // Updating the conncet disconnect button and display of address
      const address = localStorage.getItem("notiboy_address");
      context.commit("selectAddress", address);
      if (address && address.length == 58) {
        context.commit("updateConnectionDisconnect");
      } else {
        context.commit("updateConnectionConnect");
      }
    },
    disconnect(context) {
      // Removeing the data from local storage
      localStorage.removeItem("notiboy_address");
      localStorage.removeItem("PeraWallet.BridgeURL");
      localStorage.removeItem("PeraWallet.Wallet");
      localStorage.removeItem("walletconnect");
      context.commit("disconnect");
    },
    searchTextUpdate(context, searchText) {
      context.commit("searchTextUpdate", searchText);
    },
    //Creating a channel
    async createChannel(context, channelDetails) {
      try {
        const wallet = "pera"
        let response;
        let appId;
        //Creating a channel starts
        const channelCreationTransaction = await notiboy.createChannel(
          channelDetails.address
        );
        if (wallet == "myalgo") {
          const submittedTxn = await context.dispatch("signMyAlgoWallet",[channelCreationTransaction]);
          response = await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          const scDetails = await indexer.lookupTransactionByID(response.txId).do();
          appId = scDetails["transaction"]["created-application-index"]
        } else if (wallet == "pera") {
          const submittedTxn = await context.dispatch("signPeraWallet",[channelCreationTransaction]);
          response = await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          appId = response['application-index']
        }
        //Creating a channel Ends
          context.commit("updateLoaderTrue");
        console.log("channelAddress",channelDetails.address,"Appid:",appId,"channelName",channelDetails.name)
        //Channel Registration starts
        try {
          const channelRegistrationTransaction = await notiboy.channelContractOptin(
            channelDetails.address,
            appId,
            channelDetails.name
          );
          
          if (wallet == "myalgo") {
            const submittedTxn = await context.dispatch("signMyAlgoWallet", channelRegistrationTransaction);
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          } else if (wallet == "pera") {
            const submittedTxn = await context.dispatch("signPeraWallet", channelRegistrationTransaction);
            console.log("submitted transaction",submittedTxn)
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          }
          //Channel Registration Ends
          context.commit("updateLoaderFalse");

          $toast.open({
            message: "Channel Registered",
            type: "success",
            duration: 5000,
            position: "top-right",
            dismissible: true,
          });
        } catch (error) {
          context.commit("updateLoaderFalse");
          $toast.open({
            message: "Could not complete channel registration.",
            type: "error",
            duration: 5000,
            position: "top-right",
            dismissible: true,
          });
        }
      } catch (error) {
        context.commit("updateLoaderFalse");
        console.log(error)
        $toast.open({
          message: "Channel not created. Check minimum balance requirement or it may be an internal error.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get list of channels
    async getChannelList(context) {
      let channelList = await notiboy.getChannelList();
      channelList.sort((a, b) =>
        a.verificationStatus > b.verificationStatus
          ? -1
          : b.verificationStatus > a.verificationStatus
          ? 1
          : 0
      );
      context.commit("updateChannelList", channelList);
    },
    //send public notifications
    async sendPublicNotification(context, channelDetails) {
      try {
        const publicNotification = await notiboy
          .notification()
          .sendPublicNotification(
            channelDetails.address,
            context.state.userAppIndex,
            channelDetails.notification
          );
          context.commit("updateLoaderTrue");
          let wallet = "pera"
          if (wallet == "myalgo") {
            const submittedTxn = await context.dispatch("signMyAlgoWallet",[publicNotification]);
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          } else if (wallet == "pera") {
            const submittedTxn = await context.dispatch("signPeraWallet",[publicNotification]);
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          }
          context.commit("updateLoaderFalse");
        $toast.open({
          message: "Public Notification Send",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message: "Something went wrong.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //send personal notifications
    async sendPersonalNotification(context, notificationDetails) {
      try {
        const personalNotification = await notiboy
        .notification()
        .sendPersonalNotification(
            notificationDetails.address,
            notificationDetails.receiverAddress,
            notificationDetails.channelAppIndex,
            notificationDetails.channelName,
            notificationDetails.notification
          );
          context.commit("updateLoaderTrue");
          let wallet = "pera"
          if (wallet == "myalgo") {
            const submittedTxn = await context.dispatch("signMyAlgoWallet",[personalNotification]);
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          } else if (wallet == "pera") {
            const submittedTxn = await context.dispatch("signPeraWallet",[personalNotification]);
            await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
          }
          context.commit("updateLoaderFalse");
        $toast.open({
          message: "Personal Notification Sent",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        console.log(error)
        $toast.open({
          message: "Personal Notification not Sent.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //send personal notifications
    async sendBulkPersonalNotification(_, channelDetails) {
      try {
        const logicsig = await notiboy.createLogicSig(
          channelDetails.channelName
        );
        let paymentTxnArray = [];
        let lsigTxnArray = [];
        //create group transactions for signing
        for (let i = 0; i < channelDetails.receiverDetails.length; i++) {
          try {
            const personalNotification = await notiboy
              .notification()
              .sendPersonalNotification(
                channelDetails.address,
                channelDetails.receiverDetails[i].Address,
                channelDetails.channelName,
                logicsig.address(),
                channelDetails.receiverDetails[i].Notification
              );
            //split personalNotification to payment txn and lsig transaction for signing
            paymentTxnArray.push(personalNotification[0].toByte());
            lsigTxnArray.push(personalNotification[1]);
          } catch (error) {
            continue;
          }
        }
        // Checking if txn or lsig is missing
        if (paymentTxnArray.length == lsigTxnArray.length) {
          const signedPaymentTxnArray = await myAlgoWallet.signTransaction(
            paymentTxnArray
          );
          //Signing all logic sig transactions grouping them with payment transaction and send notification
          for (let i = 0; i < lsigTxnArray.length; i++) {
            try {
              const signedTxn2 = algosdk.signLogicSigTransaction(
                lsigTxnArray[i],
                logicsig
              );
              //paymentTxn, notificationTransaction
              let groupTxns = [];
              groupTxns.push(signedPaymentTxnArray[i].blob);
              groupTxns.push(signedTxn2.blob);
              await client.sendRawTransaction(groupTxns).do();
              $toast.open({
                message: `Personal Notification ${i} Sent`,
                type: "success",
                duration: 3000,
                position: "top-right",
                dismissible: true,
              });
            } catch (error) {
              continue;
            }
          }
        }
      } catch (error) {
        $toast.open({
          message: "Personal Notification not Sent",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get personal notifications
    async getPersonalNotifications(context, userAddress) {
      try {
        context.dispatch("getChannelList");
        let personalNotifications = await notiboy
          .notification()
          .getPersonalNotification(userAddress);
        for (let i = 0; i < personalNotifications.length; i++) {
          for (let j = 0; j < context.state.channels.length; j++) {
            if (
              personalNotifications[i].channel ===
                context.state.channels[j].channelName &&
              context.state.channels[j].status === "verified"
            ) {
              personalNotifications[i].status = "verified";
            }
          }
        }
        context.commit("updatePersonalNotifications", personalNotifications);
      } catch (error) {
        $toast.open({
          message: "Something Went Wrong",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //optin to channels
    async userChannelOptin(context, userDetails) {
      try {
        const channelOptinTxn = await notiboy.userChannelOptin(
          userDetails.userAddress,
          userDetails.channelAppIndex
        );

        context.commit("updateLoaderTrue");
        let wallet = "myalgo"
        if (wallet == "myalgo") {
          const submittedTxn = await context.dispatch("signMyAlgoWallet",[channelOptinTxn]);
          await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
        } else if (wallet == "pera") {
          const submittedTxn = await context.dispatch("signPeraWallet",[channelOptinTxn]);
          await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
        }
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opted Into Channel",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message:
            "Opt-in Unsuccessful.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    async userChannelOptout(context, userDetails) {
      try {
        const channelOptoutTxn = await notiboy.userChannelOptout(
          userDetails.userAddress,
          userDetails.channelAppIndex
        );

        context.commit("updateLoaderTrue");
        let wallet = "myalgo"
        if (wallet == "myalgo") {
          const submittedTxn = await context.dispatch("signMyAlgoWallet",[channelOptoutTxn]);
          await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
        } else if (wallet == "pera") {
          const submittedTxn = await context.dispatch("signPeraWallet",[channelOptoutTxn]);
          await algosdk.waitForConfirmation(client, submittedTxn.txId.toString(), 4);
        }
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opted out of Channel",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message:
            "Opt-out Unsuccessful.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get public notifications
    async getPublicNotifications(context, appIndex) {
      console.log(appIndex)
      try {
        const publicNotifications = await notiboy
          .notification()
          .getPublicNotification(appIndex);
        const sortedPublicNotifications = publicNotifications.sort((a,b) => b.index - a.index)
        context.commit("updatePublicNotifications", sortedPublicNotifications);
      } catch (error) {
        $toast.open({
          message: "Something Went Wrong",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Opt-in state
    async optinState(context) {
      const optinState = await notiboy.getNotiboyOptinState(context.state.address);
      context.commit("updateOptinState", optinState);
    },
    //connect pera wallet
    perawalletConnect({dispatch}){
      peraWallet
        .connect()
        .then((accounts) => {
          const address = accounts[0];
          localStorage.setItem("notiboy_address", address);
          localStorage.setItem("wallet", "pera");
          dispatch("updateAddress");
      })
      .catch((e) => console.log(e));
    },
    reconnectSession(context){
      const wallet = "pera"; //context.getters.userWallet;

      if (wallet == "pera") {
        peraWallet.reconnectSession().then((accounts) => {            
          if (accounts.length) {
            context.state.address = accounts[0];
          }
        });
      }
    },
    async signMyAlgoWallet(context,txns){
      try {
        let signedTxs = await myAlgoWallet.signTransaction(txns.map(tx => tx.toByte()));
        signedTxs = signedTxs.map(tx => tx.blob);
        const submittedTxn = await client.sendRawTransaction(signedTxs).do();
        return submittedTxn;
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Could not complete Signing transactions with My Algo Wallet.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }  
    },
    async signPeraWallet(context,transactions){
      context.dispatch("reconnectSession");
      const peraTxn = transactions.map(txn =>({txn}));
      try {
        let signedTxn = await peraWallet.signTransaction([peraTxn]);
        signedTxn = signedTxn.map(arr => Uint8Array.from(arr));  
        const submittedTxn = await client.sendRawTransaction(signedTxn).do();
        return submittedTxn;         
      } catch (error) {
        context.commit("updateLoaderFalse");
        console.log(error)
        $toast.open({
          message: "Could not complete Signing transactions with Pera Wallet.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    async getAppIndexFromAddress(context){
      context.commit("updateLoaderTrue");
      const appIndex = await notiboy.getAddressAppIndex(context.state.address);
      context.commit("updateUserIndex",appIndex)
      context.commit("updateLoaderFalse");
    }
  },
  modules: {},
});
