import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",
    routerPath: sessionStorage.getItem("routerPath") || "/infoIndex",
    newsId: ''
  },

  mutations: {
    saveIdentity(state, payload) {
      state.username = payload.username;
      state.token = payload.token;
      localStorage.setItem("username", payload.username);
      localStorage.setItem("token", payload.token);
    },

    deleteIdentity(state) {
      state.username = "";
      localStorage.removeItem("username");
      state.token = "";
      localStorage.removeItem("token");
    },
    setRouterPath(state, payload) {
      state.routerPath = payload.routerPath;
      sessionStorage.setItem("routerPath", payload.routerPath);
    },
    saveNewsId(state, payload) {
      state.newsId = payload.newsId

    }
  },
  actions: {},
  modules: {}
});
