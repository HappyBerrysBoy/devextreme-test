export default {
  namespaced: true,
  state: () => ({
    tmnCod: "B",
    userId: "",
    userName: "",
    groupId: "",
    groupName: "",
    rank: "",
    email: "",
  }),
  mutations: {
    setTmnCod(state, value) {
      state.tmnCod = value;
    },
    setUserId(state, value) {
      state.userId = value;
    },
    setUserName(state, value) {
      state.userName = value;
    },
    setGroupId(state, value) {
      state.groupId = value;
    },
    setGroupName(state, value) {
      state.groupName = value;
    },
    setRank(state, value) {
      state.rank = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
  },
  getters: {
    getTmnCod(state, getters, rootState) {
      return state.tmnCod;
    },
    getUserId(state, getters, rootState) {
      return state.userId;
    },
    getUserName(state, getters, rootState) {
      return state.userName;
    },
    getGroupId(state, getters, rootState) {
      return state.groupId;
    },
    getGroupName(state, getters, rootState) {
      return state.groupName;
    },
    getRank(state, getters, rootState) {
      return state.rank;
    },
    getEmail(state, getters, rootState) {
      return state.email;
    },
  },
  actions: {
    setUserInfo({ state, commit, rootState }, payload) {
      // console.log("payload.tt)", payload.tt);
      // if ((state.count + rootState.moduleA.count) % 2 === 1) {
      commit("setTmnCod", payload.TMN_COD);
      commit("setEmail", payload.E_MAIL);
      commit("setUserName", payload.NAME);
      commit("setUserId", payload.USER_ID);
      // }
    },
    setTmnCod({ state, commit, rootState }, payload) {
      // console.log("payload.tt)", payload.tt);
      // if ((state.count + rootState.moduleA.count) % 2 === 1) {
      commit("setTmnCod", payload.tmnCod);
      // }
    },
  },
};
