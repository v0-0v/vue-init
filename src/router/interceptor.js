/** 2018/12/22
 *作者:Cookie
 *功能: 全局路由拦截器
 *
 * update by  lzq on 2019/1/7
 */
import $utils from '@/utils';
import $services from '@/services';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style

NProgress.configure({ showSpinner: false });// NProgress Configuration
// 设置路由白名单
const whiteList = ['login', 'loginError'];

const beforeEach = (to, from, next) => {
  NProgress.start();
  // 检测用户token是否存在，塞入请求header
  console.log('路由拦截----111', to.name);
  console.log('路由拦截----', whiteList.indexOf(to.name));
  console.log('路由拦截', $utils.getToken());
  if ($utils.getToken()) {
    $services.setHeader({
      key: 'tokenId',
      val: $utils.getToken()
    });
  }
  else if (whiteList.indexOf(to.name) === -1) {
    next('/login');
    // next();
    return;
  }
  next();
};

const afterEach = () => {
  NProgress.done();
};

export {
  beforeEach,
  afterEach
};
