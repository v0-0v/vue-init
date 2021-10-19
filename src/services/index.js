import { Message, Loading } from 'element-ui';
import store from '../store/index';
import service from './service';
import storageM from '../storage';
import router from '../router';

import LOGIN from './config/login';

console.log(store);

function loginOver() {
  const msg = '身份验证已失效请重新登陆';
  Message.error(msg);
  store._actions['tags/delAllViews'][0]();
  router.push('/login');
}

const ServiceConf = {
  LOGIN
};

export default {
  async postLoading({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    const $loading = Loading.service({
      target: document.querySelector('div.contain'),
      lock: true,
      fullscreen: false,
      text: '请求中'
    });
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.post(urlKey, params);
    $loading.close();
    if (res && res.code === '000') {
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else if (router.app.$route.fullPath === '/login') {
      return res;
    }
    else if (res && res.code === '101' || res && res.code === '110' || res && res.code === '112') {
      loginOver();
    }
    else {
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async get({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.get(urlKey, params);
    if (res && res.code === '000') {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else if (router.app.$route.fullPath === '/login') {
      return res;
    }
    else if (res && res.code === '101' || res && res.code === '110' || res && res.code === '112') {
      loginOver();
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async getUrl({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.getUrl(urlKey, params);
    if (res && res.code === '000') {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else if (router.app.$route.fullPath === '/login') {
      return res;
    }
    else if (res && res.code === '101' || res && res.code === '110' || res && res.code === '112') {
      loginOver();
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async post({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.post(urlKey, params);
    if (res && res.code === '000') {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else if (router.app.$route.fullPath === '/login') {
      return res;
    }
    else if (res && res.code === '101' || res && res.code === '110' || res && res.code === '112') {
      loginOver();
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
      console.log('1111', res);
    }
    return res;
  },
  async postJson({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.postJson(urlKey, params);
    if (res && res.code === '000') {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else if (router.app.$route.fullPath === '/login') {
      return res;
    }
    else if (res && res.code === '101' || res && res.code === '110' || res && res.code === '112') {
      loginOver();
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async setHeader({ key, val }) {
    await service.setHeader({
      key,
      val
    });
  }
};
