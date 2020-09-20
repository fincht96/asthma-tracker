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
    selectedScale: "5d",

    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
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

    setSelectedScale(state, newScale) {
      state.selectedScale = newScale;
    },

    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    },

    setWindowHeight(state) {
      state.windowHeight = window.innerHeight;
    },
  },

  getters: {
    accountCreated: (state) => {
      return state.accountCreated;
    },

    entries: (state) => {
      return state.entries;
    },

    selectedScale: (state) => {
      return state.selectedScale;
    },

    windowWidth: (state) => {
      return state.windowWidth;
    },

    windowHeight: (state) => {
      return state.windowHeight;
    },
  },
  actions: {},
  modules: {},
});
