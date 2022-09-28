import { createStore } from "vuex";
import algosdk from "algosdk";
import sdk from "notiboy-js-sdk";
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
const notiBoy = new sdk(client, indexer);
//Conntecting my algo wallet
import MyAlgoConnect from "@randlabs/myalgo-connect";
const myAlgoWallet = new MyAlgoConnect();
const delay = require("delay");
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
        return state.address.slice(0, 14) + "...";
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

    async createChannel(_, channelDetails) {
      try {
        // creating logic sig
        const logicsig = await notiBoy.createLogicSig(channelDetails.name);

        //Funding logic sig
        const fundingTxn = await notiBoy.provideBasicLsigBalance(
          channelDetails.address,
          logicsig.address()
        );
        const signFundingtxn = await myAlgoWallet.signTransaction(
          fundingTxn.toByte()
        );
        await client.sendRawTransaction(signFundingtxn.blob).do();

        await delay(5000);
        //opt-in to channel (channel creation)
        const optInTxn = await notiBoy.optin(
          channelDetails.name,
          logicsig.address(),
          channelDetails.address,
          "dapp"
        );

        // Group transactions received from opt-in
        const signedTxn1 = await myAlgoWallet.signTransaction(
          optInTxn[0].toByte()
        );
        const signedTxn2 = algosdk.signLogicSigTransaction(
          optInTxn[1],
          logicsig
        );
        let groupTxns = [];
        groupTxns.push(signedTxn1.blob);
        groupTxns.push(signedTxn2.blob);
        await client.sendRawTransaction(groupTxns).do();
        $toast.open({
          message: "Channel Created",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message: "Channel not created",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get list of channels
    async getChannelList(context) {
      const channelList = await notiBoy.listPublicChannels();
      context.commit("updateChannelList", channelList);
    },
    //send public notifications
    async sendPublicNotification(_, channelDetails) {
      try {
        const logicsig = await notiBoy.createLogicSig(
          channelDetails.channelName
        );
        const publicNotification = await notiBoy
          .notification()
          .sendPublicNotification(
            channelDetails.address,
            logicsig.address(),
            channelDetails.channelName,
            channelDetails.notification
          );
        // Group transactions received from public Notification
        const signedTxn1 = await myAlgoWallet.signTransaction(
          publicNotification[0].toByte()
        );
        const signedTxn2 = algosdk.signLogicSigTransaction(
          publicNotification[1],
          logicsig
        );
        //paymentTxn, notificationTransaction
        let groupTxns = [];
        groupTxns.push(signedTxn1.blob);
        groupTxns.push(signedTxn2.blob);
        await client.sendRawTransaction(groupTxns).do();
        $toast.open({
          message: "Public Notification Send",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message: "An Unexpected Error",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //send personal notifications
    async sendPersonalNotification(_, channelDetails) {
      try {
        const logicsig = await notiBoy.createLogicSig(
          channelDetails.channelName
        );
        const publicNotification = await notiBoy
          .notification()
          .sendPersonalNotification(
            channelDetails.address,
            channelDetails.receiverAddress,
            logicsig.address(),
            channelDetails.channelName,
            channelDetails.notification
          );
        // Group transactions received from public Notification
        const signedTxn1 = await myAlgoWallet.signTransaction(
          publicNotification[0].toByte()
        );
        const signedTxn2 = algosdk.signLogicSigTransaction(
          publicNotification[1],
          logicsig
        );
        //paymentTxn, notificationTransaction
        let groupTxns = [];
        groupTxns.push(signedTxn1.blob);
        groupTxns.push(signedTxn2.blob);
        await client.sendRawTransaction(groupTxns).do();
        $toast.open({
          message: "Personal Notification Sent",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
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
        const personalNotifications = await notiBoy
          .notification()
          .getPersonalNotification(userAddress);
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
    async channelOptin(_, userAddress) {
      try {
        //opt-in to channel (channel creation)
        const channelName = "";
        const optInTxn = await notiBoy.optin(
          channelName,
          userAddress,
          userAddress,
          "user"
        );
        // Group transactions received from opt-in
        const signedTxn1 = await myAlgoWallet.signTransaction(
          optInTxn[0].toByte()
        );
        const signedTxn2 = await myAlgoWallet.signTransaction(
          optInTxn[1].toByte()
        );
        let groupTxns = [];
        groupTxns.push(signedTxn1.blob);
        groupTxns.push(signedTxn2.blob);
        await client.sendRawTransaction(groupTxns).do();
        $toast.open({
          message: "Opted Into Channel",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        $toast.open({
          message: "Opt-in Unsuccessful",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get public notifications
    async getPublicNotifications(context, lsig) {
      try {
        const publicNotifications = await notiBoy
          .notification()
          .getPublicNotification(lsig);
        context.commit("updatePublicNotifications", publicNotifications);
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
  },
  modules: {},
});
