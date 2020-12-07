<template>
  <div class="home_index" v-loading="loading">
    <el-container style="display:block;">
      <el-header class="top_header">
        <top-header/>
      </el-header>
      <el-container class="container" style="height: calc(100% - 60px);width:100%;">
        <el-aside width="auto" style="overflow-x: hidden;z-index:7;">
          <left-menu/>
        </el-aside>
        <el-main>
          <tags></tags>
          <contain/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from './leftMenu';
import TopHeader from './topHeader';
import Contain from './contain';
import tags from '../comm/tags';

export default {
  name: 'layout',
  components: {
    LeftMenu,
    TopHeader,
    Contain,
    tags
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    changeLayoutLoad(status) {
      this.loading = status;
    }
  }
};
</script>

<style lang="scss">
.home_index {
  height: 100%;
  width: 100%;

  .el-aside {
    background-color: #2b2f32;
  }

  .top_header {
    background-color: #2b2f32;

    > div > img {
      display: inline-block;
      margin: 10px 10px 5px 0;
      float: left;
    }
  }

  .el-container > .el-scrollbar {
    .el-scrollbar__wrap {
      overflow-x: hidden;

      .el-menu-vertical-demo {
        border-right: 0;
      }
    }
  }

  .el-main {
    padding: 0;
  }
}
.home_index >.el-loading-mask {
  background-color: rgba(255, 255, 255, 1)!important;
}
</style>
