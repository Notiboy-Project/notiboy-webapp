import { createStore } from "vuex";
import algosdk from "algosdk";
import sdk from "../sdk/index.js";
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
import MyAlgoConnect from "@randlabs/myalgo-connect";
const myAlgoWallet = new MyAlgoConnect();
const delay = require("delay");
export default createStore({
  state() {
    return {
      address: "",
      searchText: "",
      connectionStatus: "",
      notifications: [
        {
          number: 1,
          channel: "Angry Penguins",
          title: "Prepare for War",
          text: "We are planning for a war on ice world. Let the world unite.",
          date: "12 Sep 2022",
          verified: true,
        },
        {
          number: 2,
          channel: "A for Algorand",
          title: "Twitter Spaces",
          text: "Welcome to twitter spaces everyday morning EST.",
          date: "18 Sep 2022",
          verified: true,
        },
        {
          number: 3,
          channel: "Securecerts",
          title: "Immutable Certificates",
          text: "Issue immutable certificates via blockchain using securecerts.",
          date: "21 Sep 2022",
          verified: true,
        },
        {
          number: 4,
          channel: "Anirand",
          title: "Rug Number 1",
          text: "We are planning for a rug of rugs. This is anirand metaverse of metaverse.",
          date: "25 Sep 2022",
          verified: false,
        },
      ],
      channels: [],
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
    notifications(state) {
      return state.notifications;
    },
    channels(state) {
      return state.channels;
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
        const response1 = await client
          .sendRawTransaction(signFundingtxn.blob)
          .do();
        console.log(response1);

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
        const response2 = await client.sendRawTransaction(groupTxns).do();
        console.log(response2);
      } catch (error) {
        console.error(error);
      }
    },

    async getChannelList(context) {
      const channelList = await notiBoy.listPublicChannels();
      context.commit("updateChannelList", channelList);
    },

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
        const response = await client.sendRawTransaction(groupTxns).do();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

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
        const response = await client.sendRawTransaction(groupTxns).do();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
