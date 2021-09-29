export default {
  namespaced: true,
  state: () => ({ counter: 100 }),
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    },
  },
  actions: {
    setCounter(value) {
      console.log(4);
    },
  },
  getters: {
    time2(state) {
      return state.counter * 2;
    },
  },
};
