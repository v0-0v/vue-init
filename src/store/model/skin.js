// ------------------------------------------------------------------------------
// name:  皮肤 用户相关
// author: lzq
// created: 2019/1/22
// -----------------------------------------------------------------------------
// state

const State = {
  currentSkin: {
    name: '正常',
    className: 'normal'
  }
  // currentSkin: {
  //   name: '透明',
  //   className: 'glass'
  // }


  // currentSkin: {
  //   id: 0,
  //   name: '正常',
  //   className: ['auto']
  // }
};

// getters
const Getters = {
  currentSkin: state => { console.log(state.currentSkin.name); return state.currentSkin; }
};

// mutations
const Mutations = {
  changeSkin(state, skin) {
    console.log('taotaotaotao');
    state.currentSkin = skin;
  }
};

// actions
const Actions = {
  changeSkin({ commit }, resourceData) {
    resourceData.load();
    commit('changeSkin', resourceData);
  }
};

export default {
  namespaced: true,
  strict: true,
  state: State,
  getters: Getters,
  actions: Actions,
  mutations: Mutations
};
