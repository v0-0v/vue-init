/** 2018/12/22
 *作者:Cookie
 *功能: 路由挂在配置
 */

import Vue from 'vue';
import Router from 'vue-router';
import constantRouterMap from './path';
import { afterEach, beforeEach } from './interceptor';

Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
