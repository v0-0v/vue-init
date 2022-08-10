/** 2018/12/22
*作者:Cookie
*功能: 顶部内容
*
* update by  lzq on 2019/1/7
*/

<template>
  <div>
    <img src="../../assets/img/zflogo.png" height="40">
    <div class="headerTitle-warp">
      <span class="title">探针管理平台</span>
      <span class="text">Probe Management Platform</span>
    </div>
    <div class="handle-warp">
      <p><img src="../../assets/img/smile.png" style="height: 20px;verticalAlign: middle;" /> {{hello}}！欢迎登陆探针管理平台</p>
      <div>
        <!-- <el-dropdown class="el-dropdown-box">
          <span class="el-dropdown-link" :style="currentSkin.name === '透明' ? 'cursor:pointer;color:#fff;' : 'cursor:pointer;color:#565758;'">
            <i>
              <img src="../../assets/img/yonghu.png" class="dropIcon" v-if="currentSkin.name === '透明'" />
              <img src="../../assets/img/yonghu2.png" class="dropIcon" v-else>
            </i>{{userInfor.nic}}
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align:center;">
            <el-dropdown-item @click.native="showPassword=true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <span class="el-dropdown-box" style="cursor:pointer;">
          <i v-if="!isQuanPing">
            <img src="../../assets/img/quanping.png" class="dropIcon" @click="toQuanPing" v-if="currentSkin.name === '透明'" />
            <img src="../../assets/img/quanping2.png" class="dropIcon" @click="toQuanPing" v-else />
          </i>
          <i v-if="isQuanPing">
            <img src="../../assets/img/noquanping.png" class="dropIcon" @click="toQuanPing" v-if="currentSkin.name === '透明'" />
            <img src="../../assets/img/noquanping2.png" class="dropIcon" @click="toQuanPing" v-else />
          </i>
        </span>
        <el-dropdown class="el-dropdown-box" trigger="click">
          <span class="el-dropdown-link" style="cursor:pointer;color:#fff;">
            <i>
              <img src="../../assets/img/pifu.png" class="dropIcon" style="width:28px;height:28px;" v-if="currentSkin.name === '透明'" />
              <img src="../../assets/img/pifu2.png" class="dropIcon" style="width:28px;height:28px;" v-else />
            </i>
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align:center;">
            <el-dropdown-item @click.native="changeSkinS(0)" :disabled="skinIndex===0">正常</el-dropdown-item>
            <el-dropdown-item @click.native="changeSkinS(1)" :disabled="skinIndex===1">透明</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <hg-dialog title="修改密码" :visible="showPassword" :height="100" :width="400" @close="showPassword = false">
      <div style="margin-left: 25px">
        <i class="el-icon-info"></i><span style="margin-left: 5px; color: #999999;">密码修改成功需重新登录</span>
      </div>
      <el-form style="margin-top: 10px" ref="form" :model="form" label-width="80px">
        <el-form-item label="密码：" style="width:150px;">
          <el-input style="width:150px;" type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="hg-dialog-footer">
        <el-button @click="showPassword = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </hg-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HgDialog from '@/components/dialog';

const skins = {
  0: {
    id: 0,
    name: '正常',
    className: 'normal',
    // load: () => {}
    load: () => import('assets/skins/normal/normal.scss')
  },
  1: {
    id: 1,
    name: '透明',
    className: 'glass',
    load: () => import('assets/skins/glass/glass.scss')
  }
};

export default {
  name: 'topHeader',
  components: { HgDialog },
  data() {
    return {
      showPassword: false,
      form: {
        password: ''
      },
      isQuanPing: false,
      skinIndex: 0,
      hello: ''
    };
  },
  created() {
    // this.changeSkinS(0);
    let time = new Date();
    let hours = time.getHours();
    if (hours > 5 && hours <= 7) {
      this.hello = '早上好';
    }
    else if (hours > 7 && hours <= 10) {
      this.hello = '上午好';
    }
    else if (hours > 10 && hours <= 12) {
      this.hello = '中午好';
    }
    else if (hours > 12 && hours <= 17) {
      this.hello = '下午好';
    }
    else {
      this.hello = '晚上好';
    }
  },
  methods: {
    ...mapActions({
      delAllViews: 'tags/delAllViews',
      changeSkin: 'skin/changeSkin'
    }),
    loginOut() {
      this.$utils.removeStorage({
        type: 'localStorage',
        key: 'tokenId'
      });
      this.delAllViews();
      this.$router.push('/login');
    },
    async updatePassword() {
      const { status } = await this.$services.postJson({
        type: 'USERMANGEMENT',
        url: 'saveUser',
        params: {
          id: this.userInfor.id,
          password: this.form.password,
          updateFlg: 'update'
        }
      });
      if (status) {
        this.$message({
          message: '密码修改成功',
          type: 'success'
        });
        setTimeout(() => {
          this.delAllViews();
          this.$router.push('/login');
        }, 2000);
      }
    },
    changeSkinS(i) {
      // if (i) {
      //   this.skin = require('assets/skins/glass/glass.scss');
      // }
      // else {
      //   this.skin = require('assets/css/reset.scss');
      // }
      this.skinIndex = i;
      document.body.className = skins[i].className;
      this.changeSkin(skins[i]);
    },
    kaishi() {
      let docElm = document.documentElement;
      // W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      // FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      // Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      // IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    guanbi() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    toQuanPing() {
      if (this.isQuanPing) {
        this.guanbi();
        this.isQuanPing = false;
      }
      else {
        this.kaishi();
        this.isQuanPing = true;
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfor: 'user/userInfor',
      currentSkin: 'skin/currentSkin'
    })
  },
  mounted() {
    document.body.className = this.currentSkin.className;
    console.log('zhengyang', this.currentSkin);
    if (this.currentSkin.name === '透明') {
      // eslint-disable-next-line global-require
      // this.skin = require('assets/skins/glass/glass.scss');
      this.skinIndex = 1;
      skins[1].load();
    }
    else {
      this.skinIndex = 0;
      skins[0].load();
    }
  }
};
</script>

<style lang="scss">
.headerTitle-warp {
  height: 60px;
  float: left;

  > span {
    display: block;
  }

  .title {
    font-size: 20px;
    padding: 5px 0 3px 0;
    color: #fff;
  }

  .text {
    font-size: 12px;
    color: #ccc;
  }
}

.handle-warp {
  height: 60px;
  float: right;

  p {
    font-size: 12px;
    color: #ccc;
    line-height: 30px;
    vertical-align: middle;
  }

  .el-dropdown-box {
    float: right;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }

  .dropIcon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
