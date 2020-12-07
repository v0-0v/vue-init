const session = new class {
  constructor() {
    this.$date = 604800000;
    this.sessionStorage = window.sessionStorage;
  }

  // sessionStorage储存
  $set({ key, parameter, date = this.$date, reflush = false }) {
    if (key && parameter) {
      let getData = this.$get(key);
      if (!getData || reflush) {
        let overdueTime = new Date().getTime() + date;
        let arrayData = [parameter, overdueTime];
        this.sessionStorage.setItem(key, JSON.stringify(arrayData));
        console.warn(`sessionStorage缓存用户数据${parameter}`);
      } else {
        console.warn(`读取sessionStorage缓存用户数据${parameter}`);
        return getData;
      }
    }
  }

  // sessionStorage读取
  $get({ key }) {
    if (key) {
      let init = this.sessionStorage.getItem(key);
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

  // sessionStorage删除
  $remove({ key }) {
    this.sessionStorage.removeItem(key);
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

console.log(session);

export default session;
