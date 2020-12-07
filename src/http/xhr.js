import xhr from 'axios';

class XhrUtil {

  init(url, options) {
    this.url = url;
    this.options = {
      method: options.method,
      headers: options.headers,
      data: options.body
    };
    return this;
  }

  async send() {
    xhr.defaults.withCredentials = true;
    const response = await xhr(Object.assign({
      url: this.url
    }, this.options))
      .then(res => res);
    if (response.status === 200) {
      return response.data;
    }
  }
}

export default XhrUtil;
