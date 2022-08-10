// ------------------------------------------------------------------------------
// name:  user 用户相关
// author: lzq
// created: 2019/1/22
// -----------------------------------------------------------------------------
// state
// import services from '../../services';
import utils from '../../utils';
import menu from '@/mock/menu.json';

const State = {
  menuData: [], // 菜单数据
  resourceData: [], // 资源数据
  userInfor: '', // 用户信息
  loginForm: ''
};

// getters
const Getters = {
  menuData: state => state.menuData,
  resourceData: state => state.resourceData,
  userInfor: state => state.userInfor,
  getIsRemember: () => utils.getStorage({
    type: 'localStorage',
    key: 'isRemember'
  }),
  userId: state => state.userInfor.id
};

// mutations
const Mutations = {
  setMenuData(state, commData) {
    state.menuData = commData ? commData : menu;
  },
  setResourceData(state, resourceData) {
    state.resourceData = resourceData;
  },
  SETUSERINFOR(state, userInfor) {
    state.userInfor = userInfor;
  },
  GETUSERINFOR(state) {
    state.userInfor = utils.getStorage({
      type: 'localStorage',
      key: 'userInfor'
    });
  },
  REMOVEUSERINFO() {
    utils.removeStorage({
      type: 'localStorage',
      key: 'userInfor'
    });
  },
  SETISREMEMBER(state, loginForm) {
    state.loginForm = loginForm;
    utils.setStorage({
      type: 'localStorage',
      key: 'isRemember',
      parameter: loginForm
    });
  },
  REMOVEISREMEMBER(state) {
    state.loginForm = '';
    utils.removeStorage({
      type: 'localStorage',
      key: 'isRemember'
    });
  }
};

// actions
const Actions = {
  setMenuData({ commit }) {
    // return new Promise(resolve => {
    //   let userInfor = utils.getStorage({
    //     type: 'localStorage',
    //     key: 'userInfor'
    //   });
    //   services.post({
    //     type: 'USERMANGEMENT',
    //     url: 'getUserMenuList',
    //     params: {
    //       id: userInfor.id,
    //       type: 'menu'
    //     }
    //   }).then(({ status, bean }) => {
    //     if (status) {
    //       commit('setMenuData', bean);
    //     }
    //     resolve(bean);
    //   });
    // });
    return new Promise(resolve => {
      commit('setMenuData', menu);
      resolve(menu);
    });
  },
  setResourceData({ commit }, resourceData) {
    commit('setResourceData', resourceData);
  },
  setUserInfor({ commit }, userInfor) {
    commit('SETUSERINFOR', userInfor);
    utils.setStorage({
      type: 'localStorage',
      key: 'userInfor',
      parameter: userInfor
    });
  },
  getUserInfor({ commit }) {
    commit('GETUSERINFOR');
    return Promise.resolve();
  },
  removeUserInfo({ commit }) {
    commit('REMOVEUSERINFO');
  },
  setIsRemember({ commit }, loginForm) {
    commit('SETISREMEMBER', loginForm);
  },
  removeIsRemember({ commit }) {
    commit('REMOVEISREMEMBER');
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
