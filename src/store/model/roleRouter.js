/** 2019/1/24
 *作者:Cookie
 *功能: 权限路由相关
 */

import menuList from '@/mock/menu.json';
import generaMenu from '@/utils/generaMenu';
import $souter from '@/router';

const Layout = () => import('@/views/layout');

const State = {
  routerList: []
};

const Getters = {
  routerList: state => state.routerList
};

const Mutations = {
  INIT_ROUTERS(state, commData) {
    state.routerList = commData;
  }
};

// actions
const Actions = {
  // 初始化动态路由
  initRouters({ commit }, routers = '') {
    return new Promise(resolve => {
      setTimeout(() => {
        const router = generaMenu([], routers ? routers : menuList);
        $souter.addRoutes([
          {
            path: '/',
            name: 'layout',
            component: Layout,
            children: router
          }
        ]);
        $souter.onReady(() => {
          setTimeout(() => {
            // console.log('ready');
            // const loading = document.getElementById('loading');
            // document.body.removeChild(loading);
            resolve(true);
          },
          2000);
        });
        commit('INIT_ROUTERS', routers);
      }, 1000);
    });
    // new Promise.resolve(() => {
    // })

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
