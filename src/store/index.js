import { createStore } from "vuex";
import { setStore, getStore, removeStore } from "@/utils/storage";

export default createStore({
  state: {
    isCollapse: false,
    token: "",
    name: "",
  },
  mutations: {
    // 侧边栏折叠
    handleCollapse(state, data) {
      state.isCollapse = data;
    },

    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore("token", token);
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },

    CLEAR: (state, token) => {
      state.token = "";
      state.name = "";
      removeStore("token");
    },
  },
  getters: {
    getToken(state) {
      if (!state.token) {
        state.token = getStore("token");
      }
      return state.token;
    },
    name(state) {
      console.log(state.name);
      return state.name;
    },
  },
  actions: {},
  modules: {},
});
