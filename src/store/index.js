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
import router from "../router";
const app = createApp({});
app.mount("#app");
const $toast = useToast();

export default createStore({
  state() {
    return {
      address: "",
      selectedWallet: "",
      searchText: "",
      connectionStatus: "",
      personalNotifications: [],
      publicNotifications: [],
      channels: [],
      searchBarStatus: false,
      loader: false,
      optinState: false,
      searchBarDefaultText: "Search",
      userAppIndex: 0,
      userType: "",
      userSelectOverlay: false,
      notificationCounter: { personalNotification: 0, publicNotification: 0 },
      subscriberList: [],
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
    searchBarDefaultText(state) {
      return state.searchBarDefaultText;
    },
    loader(state) {
      return state.loader;
    },
    optinState(state) {
      return state.optinState;
    },
    userAppIndex(state) {
      return state.userAppIndex;
    },
    userType(state) {
      return state.userType;
    },
    userSelectOverlay(state) {
      return state.userSelectOverlay;
    },
    notificationCounter(state) {
      return state.notificationCounter;
    },
    subscriberList(state) {
      return state.subscriberList;
    },
  },
  mutations: {
    selectAddress(state, address) {
      state.address = address;
    },
    selectedWallet(state, wallet) {
      state.selectedWallet = wallet;
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
    updatesearchBarDefaultText(state, text) {
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
    updateUserIndex(state, appIndex) {
      state.userAppIndex = appIndex;
    },
    addRemoveUserSelectOverlay(state) {
      state.userSelectOverlay = !state.userSelectOverlay;
    },
    updateUserType(state, userType) {
      state.userType = userType;
    },
    updateNotificationCounter(state, notificationCounter) {
      state.notificationCounter = notificationCounter;
    },
    updateSubscriberList(state, subscriberList) {
      state.subscriberList = subscriberList;
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

      const wallet = localStorage.getItem("wallet");
      context.commit("selectedWallet", wallet);

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
      localStorage.removeItem("wallet");
      localStorage.removeItem("usertype");
      context.commit("disconnect");
    },
    searchTextUpdate(context, searchText) {
      context.commit("searchTextUpdate", searchText);
    },
    //Creating a channel
    async createChannel(context, channelDetails) {
      try {
        let appId;
        let response;
        //Creating a channel starts
        const channelCreationTransaction = await notiboy.createChannel(
          channelDetails.address
        );
        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          [channelCreationTransaction]
        );
        context.commit("updateLoaderTrue");
        response = await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        appId = response["application-index"];
        //Channel Registration starts
        try {
          const channelRegistrationTransaction =
            await notiboy.channelContractOptin(
              channelDetails.address,
              appId,
              channelDetails.name
            );

          const submittedTxn = await context.dispatch(
            "signUserGeneratedTransactions",
            channelRegistrationTransaction
          );
          await algosdk.waitForConfirmation(
            client,
            submittedTxn.txId.toString(),
            4
          );
          //Channel Registration Ends
          context.dispatch("getAppIndexFromAddress");
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
        $toast.open({
          message:
            "Channel not created. Check minimum balance requirement or it may be an internal error.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Deleting a channel
    async deleteChannel(context, userDetails) {
      context.commit("updateLoaderTrue");
      context.dispatch("getAppIndexFromAddress");
      let channelDetails;
      let submittedTxn;
      try {
        for (let i = 0; i < context.state.channels.length; i++) {
          if (context.state.channels[i].appIndex == userDetails.appIndex) {
            channelDetails = context.state.channels[i];
          }
        }
        const notiboyOptoutTxn = await notiboy.channelContractOptout(
          userDetails.address,
          channelDetails.appIndex,
          channelDetails.channelName,
          channelDetails.channelIndex
        );
        submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          notiboyOptoutTxn
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Channel unregistered.",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Channel couldnot be unregistered.",
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
        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          [publicNotification]
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Public Notification Send",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
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
        context.commit("updateLoaderTrue");
        const personalNotification = await notiboy
          .notification()
          .sendPersonalNotification(
            notificationDetails.address,
            notificationDetails.receiverAddress,
            notificationDetails.channelAppIndex,
            notificationDetails.channelName,
            notificationDetails.notification
          );
        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          [personalNotification]
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Personal Notification Sent",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Personal Notification not Sent.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //send bulk personal notifications
    async sendBulkPersonalNotification(context, notificationDetails) {
      try {
        const mnemonic = notificationDetails.mnemonic
          .replace(/[, ]+/g, " ")
          .trim();
        const secretKey = algosdk.mnemonicToSecretKey(mnemonic).sk;
        //create group transactions for signing
        for (let i = 0; i < notificationDetails.receiverDetails.length; i++) {
          try {
            context.commit("updateLoaderTrue");
            const personalNotification = await notiboy
              .notification()
              .sendPersonalNotification(
                notificationDetails.address,
                notificationDetails.receiverDetails[i].Address,
                notificationDetails.channelAppIndex,
                notificationDetails.channelName,
                notificationDetails.receiverDetails[i].Notification
              );
            context.commit("updateLoaderFalse");
            const submittedTxn = await client
              .sendRawTransaction(personalNotification.signTxn(secretKey))
              .do();
            await algosdk.waitForConfirmation(
              client,
              submittedTxn.txId.toString(),
              4
            );
            $toast.open({
              message: `Personal Notification ${i + 1} Sent.`,
              type: "success",
              duration: 5000,
              position: "top-right",
              dismissible: true,
            });
          } catch (error) {
            continue;
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
        await context.dispatch("getChannelList");
        let personalNotifications = await notiboy
          .notification()
          .getPersonalNotification(userAddress);
        const sortedPersonalNotifications = personalNotifications.sort(
          (a, b) => b.timeStamp - a.timeStamp
        );
        for (let i = 0; i < sortedPersonalNotifications.length; i++) {
          for (let j = 0; j < context.state.channels.length; j++) {
            if (
              sortedPersonalNotifications[i].appIndex ===
                context.state.channels[j].appIndex &&
              context.state.channels[j].verificationStatus === "v"
            ) {
              sortedPersonalNotifications[i].channelName =
                context.state.channels[j].channelName;
              sortedPersonalNotifications[i].verificationStatus = "Verified";
            } else if (
              sortedPersonalNotifications[i].appIndex ===
                context.state.channels[j].appIndex &&
              context.state.channels[j].verificationStatus === "u"
            ) {
              sortedPersonalNotifications[i].channelName =
                context.state.channels[j].channelName;
              sortedPersonalNotifications[i].verificationStatus = "unVerified";
            }
          }
        }
        context.commit(
          "updatePersonalNotifications",
          sortedPersonalNotifications
        );
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
    //End User Global optin
    async userGlobalOptin(context, userAddress) {
      try {
        context.commit("updateLoaderTrue");
        const userGlobalOptin = await notiboy.userContractOptin(userAddress);

        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          userGlobalOptin
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.dispatch("optinState");
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Registered with Notiboy",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Registration unsuccessful",
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
        context.commit("updateLoaderTrue");
        const channelOptinTxn = await notiboy.userChannelOptin(
          userDetails.userAddress,
          userDetails.channelAppIndex
        );

        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          [channelOptinTxn]
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opted Into Channel",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opt-in Unsuccessful.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //User opt-out of channels
    async userChannelOptout(context, userDetails) {
      try {
        context.commit("updateLoaderTrue");
        const channelOptoutTxn = await notiboy.userChannelOptout(
          userDetails.userAddress,
          userDetails.channelAppIndex
        );

        const submittedTxn = await context.dispatch(
          "signUserGeneratedTransactions",
          [channelOptoutTxn]
        );
        await algosdk.waitForConfirmation(
          client,
          submittedTxn.txId.toString(),
          4
        );
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opted out of Channel",
          type: "success",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      } catch (error) {
        context.commit("updateLoaderFalse");
        $toast.open({
          message: "Opt-out Unsuccessful.",
          type: "error",
          duration: 5000,
          position: "top-right",
          dismissible: true,
        });
      }
    },
    //Get public notifications
    async getPublicNotifications(context, appIndex) {
      try {
        const publicNotifications = await notiboy
          .notification()
          .getPublicNotification(appIndex);
        const sortedPublicNotifications = publicNotifications.sort(
          (a, b) => b.index - a.index
        );
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
    async getCounter(context, address) {
      const notificationCounter = await notiboy.getCounter(address);
      console.log(notificationCounter);
      context.commit("updateNotificationCounter", notificationCounter);
    },
    //Opt-in state of an address to a smartcontract
    async optinState(context) {
      const optinState = await notiboy.getNotiboyOptinState(
        context.state.address
      );
      context.commit("updateOptinState", optinState);
    },
    //connect pera wallet
    perawalletConnect(context) {
      peraWallet
        .connect()
        .then((accounts) => {
          const address = accounts[0];
          localStorage.setItem("notiboy_address", address);
          localStorage.setItem("wallet", "pera");
          context.dispatch("updateAddress");
          context.dispatch("checkUserType", address);
          if (this.userType == "unregistered") {
            context.commit("addRemoveUserSelectOverlay");
          }
        })
        .catch((e) => console.log(e));
    },
    //Reconnect pera wallet session
    reconnectSession(context) {
      peraWallet.reconnectSession().then((accounts) => {
        if (accounts.length) {
          context.state.address = accounts[0];
        }
      });
    },
    async signUserGeneratedTransactions(context, txns) {
      const selectedWallet = context.state.selectedWallet;
      if (selectedWallet == "myalgo") {
        try {
          let signedTxs = await myAlgoWallet.signTransaction(
            txns.map((tx) => tx.toByte())
          );
          signedTxs = signedTxs.map((tx) => tx.blob);
          const submittedTxn = await client.sendRawTransaction(signedTxs).do();
          return submittedTxn;
        } catch (error) {
          context.commit("updateLoaderFalse");
          $toast.open({
            message:
              "Could not complete Signing transactions with My Algo Wallet.",
            type: "error",
            duration: 5000,
            position: "top-right",
            dismissible: true,
          });
        }
      } else if (selectedWallet == "pera") {
        await context.dispatch("reconnectSession");
        const peraTxn = txns.map((txn) => ({ txn }));
        try {
          let signedTxn = await peraWallet.signTransaction([peraTxn]);
          signedTxn = signedTxn.map((arr) => Uint8Array.from(arr));
          const submittedTxn = await client.sendRawTransaction(signedTxn).do();
          return submittedTxn;
        } catch (error) {
          context.commit("updateLoaderFalse");
          $toast.open({
            message:
              "Could not complete Signing transactions with Pera Wallet.",
            type: "error",
            duration: 5000,
            position: "top-right",
            dismissible: true,
          });
        }
      }
    },
    //Get the channel app index created by the address
    async getAppIndexFromAddress(context) {
      context.commit("updateLoaderTrue");
      const appIndex = await notiboy.getAddressAppIndex(context.state.address);
      context.commit("updateUserIndex", appIndex);
      context.commit("updateLoaderFalse");
    },
    //Get user type
    async checkUserType(context, address) {
      context.commit("updateLoaderTrue");
      const optinState = await notiboy.getNotiboyOptinState(address);
      const appIndex = await notiboy.getAddressAppIndex(address);
      if (optinState == true) {
        if (appIndex != 0) {
          localStorage.setItem("usertype", "creator");
          context.commit("updateUserType", "creator");
          router.push({ name: "SendNotification" });
          context.commit("updateLoaderFalse");
        } else {
          localStorage.setItem("usertype", "user");
          context.commit("updateUserType", "user");
          router.push({ name: "PersonalNotification" });
          context.commit("updateLoaderFalse");
        }
        context.commit("updateUserIndex", appIndex);
      } else {
        localStorage.setItem("usertype", "unregistered");
        context.commit("addRemoveUserSelectOverlay");
        context.commit("updateUserType", "unregistered");
        context.commit("updateUserIndex", appIndex);
        context.commit("updateLoaderFalse");
      }
    },
    updateExisitngUserType(context) {
      const userType = localStorage.getItem("usertype");
      if (userType == "unregistered" || userType == "null") {
        context.commit("addRemoveUserSelectOverlay");
        context.commit("updateUserType", userType);
      } else if (userType == "creator") {
        context.commit("updateUserType", "creator");
        router.push({ name: "SendNotification" });
      } else if (userType == "user") {
        context.commit("updateUserType", "user");
        router.push({ name: "PersonalNotification" });
      }
    },
    async getsubscriberList(context, appIndex) {
      const subscriberList = await notiboy.getOptinAddressList(appIndex);
      context.commit("updateSubscriberList", subscriberList);
    },
  },
  modules: {},
});
