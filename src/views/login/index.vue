/**  2019/1/7
*作者: lzq
*功能: 登录
*/
<template>
  <div class="login-container">
    <div class="title">
      <img :src="logoSrc" alt="" />
      <div class="title-con">
        <span class="en-title">Ping'an Political Law Analysis and Early Warning Platform</span>
        <div class="ch-title">平 安 政 法 分 析 预 警 平 台</div>
      </div>
    </div>
    <div class="tab-switch">
      <!-- <div class="tab-switch-head">
        <div :class="num==='1'?'nomal-login active':'nomal-login'" @click="normalLogin('1')">普通登录</div>
        <div :class="num==='2'?'pki-login active':'pki-login'" @click="normalLogin('2')">PKI登录</div>
      </div> -->
      <div class="tab-switch-body">
        <div class="nomal-login-content" ref="login1">
          <el-form class="login-form" autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <!-- <div class="title-container">
              <h3 class="title">分析评估系统</h3>
            </div> -->
            <el-form-item prop="userName">
              <span class="svg-container svg-container_login">
                <svg t="1545994194917" class="icon" style="vertical-align:middle;position: relative;bottom: 0px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1272" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25">
                  <path d="M504.951 511.98c93.49 0 169.28-74.002 169.28-165.26 0-91.276-75.79-165.248-169.28-165.248-93.486 0-169.287 73.972-169.279 165.248-0.001 91.258 75.793 165.26 169.28 165.26z m77.6 55.098H441.466c-120.767 0-218.678 95.564-218.678 213.45V794.3c0 48.183 97.911 48.229 218.678 48.229H582.55c120.754 0 218.66-1.78 218.66-48.229v-13.77c0-117.887-97.898-213.45-218.66-213.45z" p-id="1273" fill="#889aa4"></path>
                </svg>
              </span>
              <el-input class="userNameInpt" name="username" type="text" v-model="loginForm.userName" autocomplete="on" placeholder="请输入用户名" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg t="1545994194917" class="icon" style="vertical-align:middle;position: relative;bottom: 0px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1272" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17">
                  <path d="M780.8 354.579692 665.6 354.579692 665.6 311.689846c0-72.310154-19.849846-193.299692-153.6-193.299692-138.870154 0-153.6 135.049846-153.6 193.299692l0 42.889846L243.2 354.579692 243.2 311.689846C243.2 122.249846 348.790154 0 512 0s268.8 122.249846 268.8 311.689846L780.8 354.579692zM588.8 669.420308C588.8 625.900308 554.220308 590.769231 512 590.769231s-76.8 35.131077-76.8 78.651077c0 29.459692 15.399385 54.468923 38.439385 67.820308l0 89.639385c0 21.740308 17.250462 39.699692 38.4 39.699692s38.4-17.959385 38.4-39.699692l0-89.639385C573.44 723.889231 588.8 698.88 588.8 669.420308zM896 512l0 393.609846c0 65.260308-51.869538 118.390154-115.2 118.390154L243.2 1024c-63.291077 0-115.2-53.129846-115.2-118.390154L128 512c0-65.220923 51.869538-118.390154 115.2-118.390154l537.6 0C844.130462 393.609846 896 446.779077 896 512z" p-id="1273" fill="#889aa4"></path>
                </svg>
              </span>
              <el-input class="passwordInpt" name="password" :type="passwordType" @keyup.enter.native="signIn" v-model="loginForm.password" autocomplete="on" maxlength="20" placeholder="请输入密码"></el-input>
              <span class="show-pwd" @click="showPwd" v-if="passwordType==='password'">
                <svg t="1545994194917" class="icon" style="vertical-align:middle;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1272" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                  <path d="M941.677063 391.710356c9.337669-14.005992 6.224772-32.68133-6.224772-43.575447-14.005992-10.894118-32.68133-7.78122-43.575447 6.224771-1.556449 1.556449-174.300768 205.426673-379.727441 205.426673-199.200878 0-379.727441-205.426673-381.28389-206.982098-10.894118-12.450567-31.124881-14.005992-43.575448-3.112898-12.450567 10.894118-14.005992 31.124881-3.112897 43.575448 3.112897 4.668323 40.46255 46.687322 99.600439 93.375667l-79.369676 82.48155c-12.450567 12.450567-10.894118 32.68133 1.556449 43.575448 3.112897 6.224772 10.894118 9.337669 18.675338 9.337669 7.78122 0 15.562441-3.112897 21.787213-9.337669l85.594447-88.706321c40.46255 28.013007 88.706321 54.469566 141.619438 73.14388L340.959485 707.631586c-4.668323 17.118889 4.669346 34.237779 21.787213 38.906101h9.337669c14.005992 0 26.456558-9.337669 29.568432-23.343661l32.68133-110.494556c24.90011 4.668323 51.356668 7.78122 77.813227 7.78122s52.913117-3.112897 77.813227-7.78122l32.68133 108.938108c3.112897 14.005992 17.118889 23.343661 29.569456 23.343661 3.112897 0 6.224772 0 7.78122-1.556449 17.118889-4.669346 26.456558-21.787212 21.788236-38.906102l-32.68133-108.938108c52.913117-18.675338 101.156888-45.131897 141.619438-73.14388l84.037998 87.150896c6.224772 6.224772 14.005992 9.337669 21.787212 9.337669 7.78122 0 15.562441-3.112897 21.787212-9.337669 12.450567-12.450567 12.450567-31.124881 1.556449-43.575448l-79.369675-82.48155c63.808258-46.688345 101.158934-91.820242 101.158934-91.820242z" p-id="1273" fill="#889aa4"></path>
                </svg>
              </span>
              <span @click="showPwd" v-else class="iconfont icon-yanjing show-pwd2"></span>
            </el-form-item>
            <span v-if="this.lowVersion"><a href="/js/installPackage/ChromeStandaloneSetup.exe" download="">您的浏览器版本太低了， 请下载新版本谷歌浏览器</a></span>
            <div class="is-remember-box">
              <el-checkbox class="is-remember" v-model="loginForm.isRemember">记住密码</el-checkbox>
            </div>
            <el-button type="primary" :loading="loading" @click.native.prevent="signIn">登录</el-button>
          </el-form>
        </div>
        <!-- u盘登录 -->
        <!-- <div class="pki-login-content" ref="login2">
          <img src="../../assets/img/loginbg.jpg" class="pki-img" />
          <div class="pki-btn-box">
            <div class="pki-btn">登录</div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
    </vue-particles> -->
    <!-- <canvas class="particles-js-canvas-el" width="979" height="311" style="width: 100%; height: 100%;"></canvas> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      // eslint-disable-next-line global-require
      logoSrc: require('../../assets/img/zflogo.png'),
      loginForm: {

        userName: '',
        password: '',
        // userName: '李四',
        // password: '12345',
        isRemember: false
      },
      flag: '',
      loginRules: {
        userName: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名！'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码！'
          }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      num: '1',
      lowVersion: false
    };
  },
  mounted() {
    // setup();
    this.init();
    let versionMess = this.bro();
    if (versionMess.type && versionMess.type === 'Chrome' && versionMess.version.substring(0, 2) < 43) {
      this.lowVersion = true;
    }
    else if (versionMess.type && versionMess.type === 'Firefox' && versionMess.version.substring(0, 2) < 45) {
      this.lowVersion = true;
    }
    this.getRememberStatus();
  },
  methods: {
    ...mapActions({
      setUserInfor: 'user/setUserInfor',
      setIsRemember: 'user/setIsRemember',
      removeIsRemember: 'user/removeIsRemember',
      delAllViews: 'tags/delAllViews',
      changeSkin: 'skin/changeSkin'
    }),
    ...mapGetters({
      getIsRemember: 'user/getIsRemember',
      userInfor: 'user/userInfor'
    }),
    init() {
      if (this.$route.query.name) {
        this.loginForm.password = '123456';
        this.loginForm.userName = this.$route.query.name;
        this.flag = this.$route.query.flag;
        this.getKeyIv();
        return;
      }
      this.$utils.removeStorage({
        type: 'localStorage',
        key: 'tokenId'
      });
      this.delAllViews();
      document.body.className = 'normal';
      // this.changeSkin({      //   id: 0,
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
      // this.removeUserInfo();

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

      return {};

    },
    getKeyIv() {
      this.$services.get({
        type: 'LOGIN',
        url: 'getEncryptInfo'
      }).then(keyIv => {
        this.loading = false;
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
              this.$toaster.ok(login.msg);
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
                console.log('判断用户是否记住密码', this.loginForm);
                this.setIsRemember(this.loginForm);
              }
              else {
                this.removeIsRemember();
              }
              // 登陆跳转
              if ((this.loginForm.userName === 'qidu' && this.flag === '2')) {
                this.$router.push('/largeShow/largeQiduTwo');
              }
              else if ((this.loginForm.userName === 'qidu' && this.flag === '1') || (login.bean.loginUserBean.userName === 'qidu')) {
                this.$router.push('/largeShow/largeQidu');
              }
              else if ((this.loginForm.userName === 'wenzhou' && this.flag === '2')) {
                this.$router.push('/largeShow/largeRight?isFull=true');
              }
              else if ((this.loginForm.userName === 'wenzhou' && this.flag === '1')) {
                this.$router.push('/largeShow/largeCenter?isFull=true');
              }
              else if ((this.loginForm.userName === 'wenzhou' && this.flag === '0') || (login.bean.loginUserBean.userName === 'wenzhou')) {
                this.$router.push('/largeShow/largeLeft?isFull=true');
              }
              else if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              }
              else {
                // this.$router.push('/');
                // console.log('@@@@@@@@@@', login.bean.path);
                let obj = login.bean.path;
                if (obj.children && obj.children.length > 0) {
                  this.$router.push(obj.children[0].path);
                }
                else {
                  // console.log('$$$$$$$$$$', obj.path);
                  this.$router.push(obj.path);
                }
              }
              // console.log('0000', this.$route.query.name);
            }
            else {
              this.$toaster.error(login.msg);
            }
          });
        }
        else {
          this.$toaster.error(keyIv.msg);
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
          this.loading = true;
          this.getKeyIv();
        }
        else {
          return false;
        }
      });
    },
    getRememberStatus() {
      console.log('获取是否记住密码--', this.getIsRemember());
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
<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
/**
* css backgeound $bg: #333;zhe
*/
$bg: rgba(229, 229, 229, 1);
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

@mixin tabswitch {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 1s ease;

  background-color: rgba(255, 255, 255, 1);
}

#app .login-container .el-form-item {
  margin-bottom: 30px;
}

/* reset element-ui css */
.login-container {
  margin: 0 auto;
  overflow: hidden;

  .title {
    text-align: center;
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 9999;
    img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }

    .title-con {
      text-align: left;

      .ch-title {
        color: #fff;
        font-size: 36px;
      }

      .en-title {
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .tab-switch {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
    background-color: rgba(255, 255, 255, 1);
    // opacity: 0.7;
    width: 400px;
    height: 480px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 55%;
    margin-left: -200px;
    margin-top: -240px;
    z-index: 99999;

    .tab-switch-head {
      height: 15%;
      display: flex;

      .nomal-login,
      .pki-login {
        flex: 1;
        text-align: center;
        font-size: 21px;
        line-height: 45px;
        color: #000;
        border-bottom: 2px solid #dddddd;
      }

      .active {
        color: #409eff;
        border-bottom: 2px solid #409eff;
      }
    }

    .tab-switch-body {
      overflow: hidden;
      position: relative;
      left: 0;
      top: 0;
      height: 85%;
      border-radius: 10px;

      .nomal-login-content {
        width: 100%;
        padding-top: 30px;
        left: 0;
        right: 0;
        @include tabswitch;

        .el-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          .el-form-item {
            width: 80%;
            height: 56px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;

            .el-form-item__content {
              width: 100%;
              height: 100%;
              display: flex;

              .el-input {
                height: 100%;
                display: inline-block;

                input {
                  height: 100%;
                  background: transparent;
                  border: 0px;
                  -webkit-appearance: none;
                  border-radius: 0px;
                  padding: 12px 5px 12px 15px;
                  color: $light_gray;
                  caret-color: $cursor;

                  &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                  }
                }

                // input::-webkit-input-placeholder {
                //   color: red;
                // }
              }
            }
          }

          .is-remember-box {
            width: 80%;
            height: 40px;

            .el-checkbox__label {
              color: #889aa4;
              padding-top: 15px;
            }

            .el-checkbox.is-checked {
              .el-checkbox__label {
                color: #409eff;
              }
            }
          }

          .el-button--primary {
            width: 80%;
            height: 58px;
            // font-size: 22px !important;
            margin-top: 20px;
            span {
              color: #fff;
              line-clamp: 56px;
              font-size: 17px;
            }
          }
        }
      }

      .pki-login-content {
        left: -600px;
        right: 0;
        @include tabswitch;

        .pki-img {
          width: 70%;
          height: 100%;
        }

        .pki-btn-box {
          width: 80px;
          height: 80px;
          position: absolute;
          left: 310px;
          top: 125px;
          border-radius: 50%;
          // box-shadow: 0 0 5px rgba(0, 0, 0, 0.8) inset;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.7) inset;
          padding: 4px;

          .pki-btn {
            background: radial-gradient(
              at 25px 22px,
              #fee3a8 2%,
              #fdc430 18%,
              #f6620e 80%
            );
            border-radius: 50%;
            text-align: center;
            font-size: 22px;
            line-height: 80px;
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background: url("../../assets/img/bg.jpg") no-repeat;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;

  // background-color: $bg;

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .show-pwd2 {
    position: absolute;
    right: 10px;
    top: 18px;
    font-size: 19px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

@media screen and (max-width: 1400px) {
  .login-container {
    .tab-switch {
      left: 55%;
      top: 55%;
    }
  }
}
</style>
