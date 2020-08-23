import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    accountCreated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },

    setAccountCreated(state, status) {
      state.accountCreated = status;
    },
  },

  getters: {
    accountCreated: (state) => {
      return state.accountCreated;
    },
  },
  actions: {},
  modules: {},
});
