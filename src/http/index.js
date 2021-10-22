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
  // get-参数拼接在路径后
  async get(url, params = {}) {
    let res = await httpUntil.setBodyType('form')
      .setUrl(LocalConf.baseURL + url)
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
  // get-参数在路径中间，paramsArr为要拼接的参数数组，endUrl为后部分路径
  // 如：params = {paramsArr:['taskid','username'],endUrl:'resule/'}
  // 最后请求为：plays/single/<str:taskid>/<str:username>/result/
  async getUrl(url, params = {}) {
    let res = await httpUntil.setBodyType('getUrl')
      .setUrl(LocalConf.baseURL + url)
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
  // post-参数为FormData
  // setBodyType参数可选(post提交参数类型)：
  //    form：浏览器的原生 form 表单
  //    file：FormData表单
  //    json：JSON 字符串
  //    urlSearch：路径拼接参数
  async post(url, params = {}) {
    let res = await httpUntil.setBodyType('file')
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
  // post-参数在路径中间，paramsArr为要拼接的参数数组，endUrl为后部分路径，params为传递参数
  // 如：params = {paramsArr:['taskid','username'],endUrl:'resule/',params:{id:'111'}}
  // 最后请求为：plays/single/<str:taskid>/<str:username>/result/，参数为{id:'111'} // JSON 字符串
  async postUrl(url, params = {}) {
    let res = await httpUntil.setBodyType('postUrl')
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
  // post-参数为json字符串
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
