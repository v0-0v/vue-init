const State = {
  visitedViews: [],
  cachedViews: []
};

// getters
const Getters = {
  visitedViews: state => state.visitedViews,
  cachedViews: state => state.cachedViews
};

// mutations
const Mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    console.log('11111111111111111111111111111');
    console.log('state.visitedViews--', state.visitedViews);
    console.log('view--', [view]);

    if (state.visitedViews.some(v => v.path === view.path)) return;
    let title = view.meta.title || 'no-name';
    if (view.meta.type) {
      title = view.meta.type[view.params.id].name;
    }
    state.visitedViews.push(
      Object.assign({}, view, { title })
    );
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      // // console.log(111, view);
      // const arry = view.path.split('/');
      // // console.log(11, arry);
      // if (arry.length > 2) {
      //   if (!state.cachedViews.includes(arry[1])) {
      //     state.cachedViews.push(arry[1]);
      //   }
      //   if (!state.cachedViews.includes(arry[2])) {
      //     state.cachedViews.push(arry[2]);
      //   }
      // }
      if (!state.cachedViews.includes(view.name)) state.cachedViews.push(view.name);
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    for (let i = 0, { length } = state.cachedViews; i < length; i++) {
      let item = state.cachedViews[i];
      if (item === view.name) {
        state.cachedViews.splice(i, 1);
        i--;
        // // 判断是否是二级路由
        // const arry = view.path.split('/');
        // // 二级路由
        // if (arry.length > 2) {
        //   const parentIndex = state.cachedViews.indexOf(arry[1]);
        //   state.cachedViews.splice(parentIndex, 1);
        // }
        break;
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews = state.visitedViews.slice(i, i + 1);
        break;
      }
    }
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i);
        state.cachedViews = state.cachedViews.slice(index, index + 1);
        break;
      }
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = [];
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = [];
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
};
// actions
const Actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view);
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view);
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    });
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    });
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view);
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
