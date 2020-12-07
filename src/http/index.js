import { LocalConf, SrvConf } from 'httpConfig';
import Http from './http';

let httpUntil = new Http({ type: 'fetch' });

httpUntil.setOvertime(10 * 1000)
  .setCookieCors()
  .setHeader({
    Accept: 'application/json',
    invoke_source: SrvConf.invoke_source
  });


export default {
  async setHeader({ key, val }) {
    httpUntil.setHeader(key, val);
  },
  async get(url, params = {}) {
    let res = await httpUntil.setUrl(LocalConf.baseURL + url)
      .setMethod('GET')
      .setBody(params)
      .send()
      .then(data => data)
      .catch(error => {
        console.warn('=> catch: ', error);
        if (error.toString() === 'Error: request timeout') {
          return {
            msg: '请求超时'
          };
        }
      });
    return res;
  },
  async post(url, params = {}) {
    let res = await httpUntil.setBodyType('urlSearch')
      .setUrl(LocalConf.baseURL + url)
      .setMethod('POST')
      .setBody(params)
      .send()
      .then(data => data)
      .catch(error => {
        console.warn('=> catch: ', error);
        if (error.toString() === 'Error: request timeout') {
          return {
            msg: '请求超时'
          };
        }
      });
    return res;
  },
  async postJson(url, params = {}) {
    let res = await httpUntil.setBodyType('json')
      .setUrl(LocalConf.baseURL + url)
      .setMethod('POST')
      .setBody(params)
      .send()
      .then(data => data)
      .catch(error => {
        console.warn('=> catch: ', error);
        if (error.toString() === 'Error: request timeout') {
          return {
            msg: '请求超时'
          };
        }
      });
    return res;
  }
};
