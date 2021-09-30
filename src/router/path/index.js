/** 2018/12/22
 *作者:Cookie
 *功能: 路由配置项
 *
 *  update by  lzq on 2019/1/7
 */
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
      },
      {
        path: '/demo',
        name: 'demo',
        component: demo,
        meta: {
          title: 'demo'
        }
      }
    ]
  }
];
