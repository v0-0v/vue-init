// import { Message } from 'element-ui';
import { SUCCESS } from '../conf/response.code.conf';
import http from '../http';

export default {
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
