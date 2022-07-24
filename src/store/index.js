import { createStore } from "vuex";

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
      channels: [
        { number: 1, name: "AoA", verified: true, optIn: true },
        { number: 2, name: "Angry Penguins NFT", verified: true, optIn: false },
        { number: 3, name: "Rand Labs", verified: false, optIn: false },
        { number: 4, name: "ANS", verified: true, optIn: false },
      ],
    };
  },
  getters: {
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
  },
  modules: {},
});
