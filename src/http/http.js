/* eslint-disable */
import fetch from './fetch';

import xhr from './xhr';
import 'url-search-params-polyfill';

class HttpUtil {
  constructor(operation) {
    this.type = operation.type ? operation.type : 'fetch';
    this.init();
  }

  init() {
    this.url = '';
    this.method = 'GET';
    this._headers = {};
    this.headers = {};
    this.body_type = 'form';
    this.bodys = {};
    this.credentials = 'omit';
    this.return_type = 'json';
    this.overtime = 0;
    this.firstThen = undefined;
    this.fetchUntil = new fetch({ return_type: this.return_type });
    this.xhrUntil = new xhr();
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setMethod(val) {
    this.method = val;
    return this;
  }

  setBodyType(val) {
    this.body_type = val;
    return this;
  }

  setReturnType(val) {
    this.return_type = val;
    return this;
  }

  setOvertime(val) {
    this.overtime = val;
    return this;
  }

  setGlobalHeader(name, val = null) {
    if (typeof name === 'string') {
      this._headers[name] = val;
    }
    else if (typeof name === 'object') {
      Object.keys(name)
      .map((index) => {
        this._headers[index] = name[index];
      });
    }
    return this;
  }

  setHeader(name, val = null) {
    this.headers = {};
    if (typeof name === 'string') {
      this.headers[name] = val;
    }
    else if (typeof name === 'object') {
      Object.keys(name)
      .map((index) => {
        this.headers[index] = name[index];
      });
    }
    return this;
  }

  setBody(name, val) {
    this.bodys = {};
    if (typeof name === 'string') {
      this.bodys[name] = val;
    }
    else if (typeof name === 'object') {
      Object.keys(name)
      .map((index) => {
        this.bodys[index] = name[index];
      });
    }
    return this;
  }

  setCookieOrigin() {
    this.credentials = 'same-origin';
    return this;
  }

  setCookieCors() {
    this.credentials = 'include';
    return this;
  }

  thenStart(then) {
    this.firstThen = then;
    return this;
  }

  async send() {
    let options = {};
    options.method = this.method;
    options.credentials = this.credentials;
    if ({} !== this.bodys && this.method !== 'GET') {
      if ('form' === this.body_type) {
        // 提交浏览器的原生 form 表单
        this.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        let data = '';
        Object.keys(this.bodys)
        .map((index) => {
          let param = encodeURI(this.bodys[index]);
          data += `${index}=${param}&`;
        });
        options.body = data;
      }
      else if ('file' === this.body_type) {
        // 提交FormData表单
        this.setHeader('Content-Type', 'multipart/form-data;charset=UTF-8');
        let data = new FormData();
        Object.keys(this.bodys)
        .map((index) => {
          data.append(index, this.bodys[index]);
        });
        options.body = data;
      }
      else if ('json' === this.body_type) {
        // 提交 JSON 字符串
        this.setHeader('Content-Type', 'application/json;charset=UTF-8');
        options.body = JSON.stringify(this.bodys);
      }
      else if ('urlSearch' === this.body_type) {
        // 提交路径拼接参数
        let data = new URLSearchParams();
        Object.keys(this.bodys)
        .map((index) => {
          data.append(index, this.bodys[index]);
        });
        options.body = data.substring(0, data.length - 1);
      }
      else if ('postUrl' === this.body_type) {
        // post方式，参数在路径中间，paramsArr为要拼接的参数数组，endUrl为后部分路径，params为传递参数
        // 如：this.bodys = {paramsArr:['taskid','username'],endUrl:'resule/',params:{id:'111'}}
        // 最后请求为：plays/single/<str:taskid>/<str:username>/result/，参数为{id:'111'} // JSON 字符串
        let data = '';
        this.bodys.paramsArr && this.bodys.paramsArr
        .map((param) => {
          data += `${param}/`;
        });
        data +=this.bodys.endUrl;
        this.url = this.url + data;

        if (this.bodys.params) {
          this.setHeader('Content-Type', 'application/json;charset=UTF-8');
          options.body = JSON.stringify(this.bodys.params);
        }
        this.bodys = {};
      }
    }
    else if ('getUrl' === this.body_type) {
      // get方式，参数在路径中间，paramsArr为要拼接的参数数组，endUrl为后部分路径
      // 如：this.bodys = {paramsArr:['taskid','username'],endUrl:'resule/'}
      // 最后请求为：plays/single/<str:taskid>/<str:username>/result/
      let data = '';
      this.bodys.paramsArr && this.bodys.paramsArr
      .map((param) => {
        data += `${param}/`;
      });
      data +=this.bodys.endUrl;
      this.bodys = {};
      this.url = this.url + data;
    }
    else {
      // get方式
      let data = '';
      Object.keys(this.bodys)
      .map((index) => {
        let param = encodeURI(this.bodys[index]);
        data += `&${index}=${param}`;
      });
      data = data.replace('&', '?');
      this.bodys = {};
      this.url = this.url + data;
    }
    options.headers = Object.assign(this._headers, this.headers);
    let res = '';
    if (this.type === 'fetch') {
      res = await this.fetchUntil.init(this.url, options)
      .send()
      .then(data => {
        return data;
      });
    }
    else {
      console.log(options);
      res = await this.xhrUntil.init(this.url, options)
      .send()
      .then(data => {
        return data;
      });
    }
    return res;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default HttpUtil;
