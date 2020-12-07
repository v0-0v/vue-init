/** 2018/12/22
 *作者:Cookie
 *功能: 路由配置项
 *
 *  update by  lzq on 2019/1/7
 */

import login from '../../views/login';

import loginError from '../../views/login/loginError.vue';
import demo from '@/demo';
import Layout from '../../views/layout';

export default [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/loginError',
    name: 'loginError',
    component: loginError,
    meta: {
      title: '登录失败'
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo,
    meta: {
      title: 'demo'
    }
  }
  // {
  //   path: '/',
  //   name: 'layout',
  //   component: Layout,
  //   redirect: '/',
  //   // children: [...report, ...dataManage, ...assessConfig, ...systemManagement, ...logManagement, ...Home, ...Statistics]
  //   children: [...Home]
  // }
];
