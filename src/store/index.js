import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Comm from './model/comm';
import Tags from './model/tags';
import user from './model/user';
import skin from './model/skin';
import roleRouter from './model/roleRouter';


Vue.use(Vuex);
/**
 * paths <Array>：部分持久化状态的任何路径的数组。如果没有给出路径，则保持完整状态。必须使用点表示法指定路径。如果使用模块，请包含模块名称。例如：“auth.user”（默认值：[]）
 */
export default new Vuex.Store({
  //vuex-persistedstate固化数据
  plugins: [createPersistedState({
    paths: ['user.userInfor', 'skin.currentSkin'] // module.state
  })],
  modules: {
    comm: Comm,
    tags: Tags,
    user,
    skin,
    roleRouter
  }
});
