const local = new class {
  constructor() {
    this.$date = 604800000;
    this.localStorage = window.localStorage;
  }

  // 存储
  $set({ key, parameter, date = this.$date, reflush = false }) {
    if (key && parameter) {
      let getData = this.$get(key);
      if (!getData || reflush) {
        let overdueTime = new Date().getTime() + date;
        let arrayData = [parameter, overdueTime];
        this.localStorage.setItem(key, JSON.stringify(arrayData));
        console.warn(`sessionStorage缓存用户数据${parameter}`);
      }
      console.warn('读取localStorage缓存用户数据', parameter);
      return getData;
    }
  }

  // 读取
  $get({ key }) {
    if (key) {
      let init = this.localStorage.getItem(key);
      if (!init) {
        return undefined;
      }
      init = JSON.parse(init);
      if (this.$timeDetermine(init)) {
        return init[0];
      }
      console.warn(`${key}数据内容已过期`);
      this.$remove(key);
      return undefined;
    }
  }

  // 删除
  $remove({ key }) {
    this.localStorage.removeItem(key);
    console.warn('localStorage清除用户数据');
  }

  // 储存数据过期判定
  $timeDetermine(init) {
    let newDate = new Date().getTime();
    if ((init[1] - newDate) > 0) {
      return true;
    }
    return false;
  }
}();

export default local;
