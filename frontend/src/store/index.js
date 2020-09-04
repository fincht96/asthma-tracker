import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class Entry {
  constructor() {
    this.date = "";
    this.peakFlow = "";
    this.medication = "";
    this.comment = "";
  }
}

export default new Vuex.Store({
  state: {
    authenticated: false,
    accountCreated: false,
    entries: [],
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },

    setAccountCreated(state, status) {
      state.accountCreated = status;
    },

    addNewEntry(state, newEntry) {
      state.entries.push(newEntry);
    },
  },

  getters: {
    accountCreated: (state) => {
      return state.accountCreated;
    },

    entries: (state) => {
      return state.entries;
    },
  },
  actions: {},
  modules: {},
});
