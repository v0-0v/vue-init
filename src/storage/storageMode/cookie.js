import Cookies from 'js-cookie';

class cookiesStorage {
  constructor({ $date }) {
    this.$date = $date;
  }

  // cookie储存
  $set({ key, parameter, date = this.$date, reflush = false }) {
    if (key && parameter) {
      let getData = this.$get(key);
      if (!getData || reflush) {
        this.$surplus();
        let time = new Date(new Date().getTime() + date);
        Cookies.set(key, JSON.stringify(parameter), { expires: time });
        console.warn(`cookie缓存用户数据${JSON.stringify(parameter)}`);
      }
      console.warn(`读取cookie缓存用户数据${JSON.stringify(parameter)}`);
      return getData;
    }
  }

  // cookie读取
  $get({ key }) {
    if (key) {
      let init = JSON.parse(Cookies.getItem(key));
      if (!init) {
        console.warn(`暂无${key}数据`);
        return undefined;
      }
      if (this.$timeDetermine(init)) {
        return init[0];
      }
      console.warn(`${key}数据内容已过期`);
      this.$remove(key);
      return undefined;
    }
  }

  // cookie清除
  $remove({ key }) {
    Cookies.remove(key);
    console.warn('Cookies清除用户数据');
  }

  // 探测Cookie剩余内存
  $surplus() {
    if (document.cookie.length > 3000) {
      console.warn(`cookie长度总量已达${document.cookie.length}字节,cookie总长度不能超过4096`);
    }
  }
}

export default cookiesStorage;
