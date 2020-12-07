import fetch from 'isomorphic-fetch';

class FetchUtil {
  constructor(options) {
    this.return_type = options.return_type;
  }

  init(url, options) {
    this.url = url;
    this.method = options.method;
    this.headers = options.headers;
    this.body_type = options.body_type;
    this.bodys = options.bodys;
    this.credentials = options.credentials;
    this.overtime = options.overtime;
    this.firstThen = options.firstThen;
    this.options = options;
    return this;
  }

  send() {
    return Promise.race([
      fetch(this.url, this.options),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), this.overtime ? this.overtime : 30 * 1000);
      })
    ]).then(
      response => {
        if (this.firstThen) {
          let tempResponse = this.firstThen(response);
          if (tempResponse) {
            return tempResponse;
          }
        }
        return response;
      }
    ).then(response => {
      switch (this.return_type) {
        case 'json':
          return response.json();
        case 'text':
          return response.text();
        case 'blob':
          return response.blob();
        case 'formData':
          return response.formData();
        case 'arrayBuffer':
          return response.arrayBuffer();
        default:
          return response.json();
      }
    });
  }
}

export default FetchUtil;
