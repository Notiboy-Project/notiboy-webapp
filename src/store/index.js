import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      address: "",
      searchText:"",
      connectionStatus:""
    }
  },
  getters: {
    updatedAddress(state) {
      if (state.address == null) {
        return "";
      } else {
        return state.address.slice(0, 14) + "...";
      }
    },
    searchText(state){
      return state.searchText;
    },
    connectionStatus(state){
      return state.connectionStatus;
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
    searchTextUpdate(state,searchText){
      state.searchText = searchText;
    },
    updateConnectionConnect(state){
      state.connectionStatus = "Connect";
    },
    updateConnectionDisconnect(state){
      state.connectionStatus = "Disconnect";
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
      if(address && address.length == 58){
        context.commit("updateConnectionDisconnect");
      }else{
        context.commit("updateConnectionConnect")
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
    searchTextUpdate(context,searchText){
      context.commit("searchTextUpdate", searchText)
    }
  },
  modules: {},
});
