export default {
  namespaced: true,
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  getters: {
    doubleCount(state, getters, rootState) {
      return state.count * 2;
    },
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }, payload) {
      console.log("payload.tt)", payload.tt);
      // if ((state.count + rootState.moduleA.count) % 2 === 1) {
      commit("increment");
      // }
    },
  },
};
