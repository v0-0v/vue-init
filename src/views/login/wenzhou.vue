/**  2019/1/7
*作者: lzq
*功能: 登录
*/
<template>
  <div class="login-container wenzhou" v-loading="loading">
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'wenzhou',
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
        isRemember: false
      },
      flag: '', // 标识大屏直接跳转是页面
      loading: true
    };
  },
  mounted() {
    // setup();
    this.init();
    let versionMess = this.bro();
    if (versionMess.type === 'Chrome' && versionMess.version.substring(0, 2) < 43) {
      this.lowVersion = true;
    }
    if (versionMess.type === 'Firefox' && versionMess.version.substring(0, 2) < 45) {
      this.lowVersion = true;
    }
    this.getRememberStatus();
  },
  methods: {
    ...mapActions({
      setUserInfor: 'user/setUserInfor',
      setIsRemember: 'user/setIsRemember',
      removeUserInfo: 'user/removeUserInfo',
      removeIsRemember: 'user/removeIsRemember',
      delAllViews: 'tags/delAllViews',
      changeSkin: 'skin/changeSkin'
    }),
    ...mapGetters({
      getIsRemember: 'user/getIsRemember',
      userInfor: 'user/userInfor'
    }),
    init() {
      this.$utils.removeStorage({
        type: 'localStorage',
        key: 'tokenId'
      });
      this.delAllViews();
      document.body.className = 'normal';
      // this.changeSkin({
      //   id: 0,
      //   name: '正常',
      //   className: 'normal',
      //   load: () => import('assets/skins/normal/normal.scss')
      // });
      this.changeSkin({
        id: 1,
        name: '透明',
        className: 'glass',
        load: () => import('assets/skins/glass/glass.scss')
      });
      this.removeUserInfo();
      console.log('温州用户名---', this.$route.query.name);
      console.log('温州用户名---', this.$route.query.flag);
      this.loginForm.password = '';
      this.loginForm.userName = '';
      this.flag = '';
      if (this.$route.query.name) {
        console.log('执行登录请求----', this.$route.query.flag);
        this.loginForm.password = '123456';
        this.loginForm.userName = this.$route.query.name;
        this.flag = this.$route.query.flag;
        this.getKeyIv(this.$route.query.flag);
      }
    },
    bro() {
      let explorer = window.navigator.userAgent.toLowerCase();
      // ie
      if (explorer.indexOf('msie') >= 0) {
        let ver = explorer.match(/msie ([\d.]+)/)[1];
        return { type: 'IE', version: ver };
      }
      // firefox
      if (explorer.indexOf('firefox') >= 0) {
        let ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return { type: 'Firefox', version: ver };
      }
      // Chrome
      if (explorer.indexOf('chrome') >= 0) {
        let ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return { type: 'Chrome', version: ver };
      }
      // Opera
      if (explorer.indexOf('opera') >= 0) {
        let ver = explorer.match(/opera.([\d.]+)/)[1];
        return { type: 'Opera', version: ver };
      }
      // Safari
      if (explorer.indexOf('Safari') >= 0) {
        let ver = explorer.match(/version\/([\d.]+)/)[1];
        return { type: 'Safari', version: ver };
      }

    },
    getKeyIv(flag) {
      this.$services.get({
        type: 'LOGIN',
        url: 'getEncryptInfo'
      }).then(keyIv => {
        if (keyIv.status) {
          let { encryptIv, encryptKey } = keyIv.bean;
          let keyPassWord = this.$utils.crypto.CryptoString(
            this.loginForm.password,
            encryptKey,
            encryptIv
          );
          this.$services.post({
            type: 'LOGIN',
            url: 'login',
            params: {
              accountId: '1234',
              userName: this.loginForm.userName,
              password: keyPassWord,
              autoLogin: '0'
            }
          }).then(login => {
            if (login.code === '000') {
              this.loading = false;
              //   this.$toaster.ok(login.msg);
              // 将token设置请求头
              this.$services.setHeader({
                key: 'tokenId',
                parameter: login.bean.tokenId
              });
              // 将token存入localstorage
              this.$utils.setToken({
                key: 'tokenId',
                parameter: login.bean.tokenId
              });
              // 将用户信息存入vuex
              this.setUserInfor(login.bean.loginUserBean);
              // 判断用户是否记住密码
              if (this.loginForm.isRemember) {
                this.setIsRemember(this.loginForm);
              }
              else {
                this.removeIsRemember();
              }
              // 登陆跳转
              // http://localhost:8080/#/wenzhou?name=wenzhou&flag=0 温州大屏一
              // http://localhost:8080/#/wenzhou?name=wenzhou&flag=1 温州大屏二
              // http://localhost:8080/#/wenzhou?name=wenzhou&flag=2 温州大屏三
              // http://115.236.164.82:8088/#/wenzhou?name=wenzhou&flag=0
              // http://115.236.164.82:8088/#/wenzhou?name=wenzhou&flag=1
              // http://115.236.164.82:8088/#/wenzhou?name=wenzhou&flag=2

              console.log(this.$route.query.redirect, this.$route.query.name);
              console.log('跳转前', this.$route.query.name);
              console.log('跳转前', this.$route.query.flag);
              console.log('跳转前', typeof this.$route.query.name);
              console.log('跳转前', typeof this.$route.query.flag);
              console.log('login.bean.loginUserBean', login.bean.loginUserBean);

              if ((this.loginForm.userName === 'wenzhou' && flag === '2')) {
                // console.log('222222222222222222222222222222222222222222');
                this.$router.push('/largeShow/largeRight?isFull=true');
              }
              else if ((this.loginForm.userName === 'wenzhou' && flag === '1')) {
                // console.log('111111111111111111111111111111111111111111');
                this.$router.push('/largeShow/largeCenter?isFull=true');
              }
              else if ((this.loginForm.userName === 'wenzhou' && flag === '0') || (login.bean.loginUserBean.userName === 'wenzhou')) {
                // console.log('000000000000000000000000000000000000000000');
                this.$router.push('/largeShow/largeLeft?isFull=true');
              }
              else if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              }
              else {
                this.$router.push('/');
              }
            }
            else {
              //   this.$toaster.error(login.msg);
            }
          });
        }
        else {
          //   this.$toaster.error(keyIv.msg);
        }
      });
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      }
      else {
        this.passwordType = 'password';
      }
    },
    signIn() {
      this.$refs.loginForm.validate(valid => {

        if (valid) {
          this.getKeyIv();
        }
        else {
          return false;
        }
      });
    },
    getRememberStatus() {
      if (this.getIsRemember()) {
        this.loginForm = this.getIsRemember();
      }
    },
    normalLogin(num) {
      this.num = num;
      if (num === '1') {
        this.$refs.login1.style.visibility = 'visible';
        this.$refs.login1.style.left = '0px';
        this.$refs.login2.style.left = '600px';
        this.$refs.login2.style.visibility = 'hidden';
        this.$refs.login2.style.left = '-600px';
      }
      else if (num === '2') {
        this.$refs.login2.style.visibility = 'visible';
        this.$refs.login2.style.left = '0px';
        this.$refs.login1.style.left = '600px';
        this.$refs.login1.style.visibility = 'hidden';
        this.$refs.login1.style.left = '-600px';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/backgroundImg.png") no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
}
</style>
<style lang="scss">
.el-loading-spinner {
  display: flex;
  justify-content: center;
  align-self: center;
}
.el-loading-mask {
  background-color: rgba(255, 255, 255, 1);
}
</style>
