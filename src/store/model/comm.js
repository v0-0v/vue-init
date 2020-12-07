// ------------------------------------------------------------------------------
// author: cookie( h5devs.com/h5devs.net )
// created: 2018/12/1 22:30
// ------------------------------------------------------------------------------
// state
const State = {
  commData: []
};

// getters
const Getters = {
  commData: state => state.commData
};

// mutations
const Mutations = {
  setSource(state, commData) {
    state.commData = commData;
  }
};

// actions
const Actions = {
  setCommData({ commit }, commData) {
    commit('setSource', commData);
  }
};

export default {
  namespaced: true, //使用了命名空间引入时需要加上模块名.模块属性
  strict: true, //开启严格模式后只能通过mutation来改变状态（不支持异步）否则会报错
  state: State,
  getters: Getters,
  actions: Actions,
  mutations: Mutations
};
