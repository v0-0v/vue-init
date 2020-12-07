/** 2019/1/15
 *作者:lzq
 *功能: 首页
 */

const Home = () => import(/* webpackChunkName: "organizationalManagement" */ '@/views/home');
export default [
  {
    path: '',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Home
  }
];
