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
        let data = new FormData();
        Object.keys(this.bodys)
        .map((index) => {
          data.append(index, this.bodys[index]);
        });
        options.body = data;
      }
      else if ('json' === this.body_type) {
        // this.setHeader('Content-Type', 'application/json;charset=UTF-8');
        options.body = JSON.stringify(this.bodys);
      }
      else if ('urlSearch' === this.body_type) {
        // let data = new URLSearchParams();
        // Object.keys(this.bodys)
        // .map((index) => {
        //   data.append(index, this.bodys[index]);
        // });

        // this.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        // let data = '';
        // Object.keys(this.bodys)
        // .map((index) => {
        //   let param = encodeURI(this.bodys[index]);
        //   console.log(this.bodys[index], param)
        //   data += `${index}=${param}&`;
        //   data += str;
        // });
        
        // options.body = data.substring(0, data.length - 1);
        let data = new FormData();
        Object.keys(this.bodys)
        .map((index) => {
          data.append(index, this.bodys[index]);
        });
        options.body = data
      }
    }
    else {
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
