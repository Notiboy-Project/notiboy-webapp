import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      address: "",
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
  },
  mutations: {
    selectAddress(state, address) {
      state.address = address;
    },
    disconnect(state){
      state.address = ""
    }
  },
  actions: {
    selectAddress(context, address) {
      context.commit("selectAddress", address);
    },
    updateAddress(context) {
      let address = localStorage.getItem("address");
      context.commit("selectAddress", address);
    },
    disconnect(context){
      localStorage.removeItem("address")
      context.commit("disconnect")
    }
  },
  modules: {},
});
