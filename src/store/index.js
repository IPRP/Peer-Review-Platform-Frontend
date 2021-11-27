import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {
      username: undefined,
      password: undefined,
      role: undefined
    },
    returnRoute: undefined
  },
  getters: {
    account: state => {
      return state.account;
    },
    isAuthenticated: state => {
      return (
        state.account.username !== undefined &&
        state.account.password !== undefined &&
        state.account.role !== undefined
      );
    },
    returnRoute: state => {
      return state.returnRoute;
    },
    isReturnRoute: state => {
      return state.returnRoute !== undefined;
    }
  },
  mutations: {
    setAccount(state, { username, password, role }) {
      //Vue.set(state.account, "username", username);
      //Vue.set(state.account, "password", password);
      state.account.username = username;
      state.account.password = password;
      state.account.role = role;
    },
    setReturnRoute(state, route) {
      state.returnRoute = route;
    }
  },
  actions: {},
  modules: {}
});
