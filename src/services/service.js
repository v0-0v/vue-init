// import { Message } from 'element-ui';
import { SUCCESS } from '../conf/response.code.conf';
import http from '../http';

export default {
  // get-参数拼接在路径后
  async get(url, params = {}) {
    try {
      const data = await http.get(url, params);
      if (data.code === SUCCESS) {
        return (data);
      }
    }
    catch (err) {
      return {
        code: '000000',
        err
      };
    }
  },
  // get-参数在路径中间，paramsArr为要拼接的参数数组，endUrl为后部分路径
  // 如：params = {paramsArr:['taskid','username'],endUrl:'resule/'}
  // 最后请求为：plays/single/<str:taskid>/<str:username>/result/
  async getUrl(url, params = {}) {
    try {
      const data = await http.getUrl(url, params);
      if (data.code === SUCCESS) {
        return (data);
      }
    }
    catch (err) {
      return {
        code: '000000',
        err
      };
    }
  },
  // post-参数为FormData
  async post(url, params = {}) {
    try {
      const data = await http.post(url, params);
      if (data.code === SUCCESS) {
        data.status = true;
        return data;
      }
      data.status = false;
      return data;
    }
    catch (err) {
      return {
        code: '000000',
        err
      };
    }
  },
  // post-参数为json字符串
  async postJson(url, params = {}) {
    try {
      const data = await http.postJson(url, params);
      if (data.code === SUCCESS) {
        data.status = true;
        return data;
      }
      data.status = false;
      return data;
    }
    catch (err) {
      return {
        code: '000000',
        err
      };
    }
  },
  async setHeader({ key, val }) {
    await http.setHeader({
      key,
      val
    });
  },
  async confirm() {}
};
