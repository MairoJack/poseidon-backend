import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: false,
  },
  mutations: {
    // 侧边栏折叠
    handleCollapse(state, data) {
      state.isCollapse = data;
    },
  },
  actions: {},
  modules: {},
});
