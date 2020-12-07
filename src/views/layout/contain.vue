/** 2018/12/22
*作者:Cookie
*功能: 目录子路由文件
*/

<template>
  <div class="contain">
    <!--<breadcumb/>-->
    <div class="content" id="divScroll">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews"  :exclude="['largeShow','largeCenter','largeLeft','largeRight','largeQidu','largeQiduTwo']">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="page-footer">
      <!-- 版本所有 &copy;杭州世平信息科技有限公司 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'contain',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cachedViews: 'tags/cachedViews'
    }),
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="scss">
//去掉不必要的css
.contain {
  width: 100%;
  height: calc(100% - 35px);
  overflow-y: auto;
  flex: 1;

  .content {
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 30px);
    /*margin: 20px;*/
    padding: 3px 20px 0 4px;
    box-sizing: border-box;
  }
  .page-footer {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #2b2f32;
    color: #fff;
    text-align: center;
  }
}
</style>
