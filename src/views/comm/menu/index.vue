/** 2018/12/22
*作者:Cookie
*功能: 侧边菜单栏
*des: 目前暂定三级，后面考虑升级承jsx，做成无限树状嵌套
*/
<template>
  <div class="menu">
    <el-menu :default-active="activeIndex" class="el-menu-vertical" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <!--<div v-for="(subItems, sindex) in menuData" :key="sindex">-->
      <div v-for="(subItems, sindex) in menuData" :key="sindex" class="itemBox">
        <menu-sub-item v-if="subItems.children && subItems.leaf" :item="subItems">
          <div v-for="(item, index) in subItems.children" :key="index">
            <menu-sub-item v-if="item.children  && item.leaf" :item="item">
              <menu-item v-for="(litem, lindex) in item.children" :item="litem" :key="lindex" />
            </menu-sub-item>
            <menu-item v-else :item="item" />
          </div>
        </menu-sub-item>
        <menu-item v-else :item="subItems" />
      </div>
    </el-menu>
    <div class="move-trigger" @click="isCollapse=!isCollapse">
      <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
      <i v-else class="el-icon-d-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import menuItems from '../../../mock/menu.json';
import MenuItem from './menuItem';
import MenuSubItem from './menuSubItem';

export default {
  name: 'Menu',
  components: {
    MenuItem,
    MenuSubItem
  },
  data() {
    return {
      isCollapse: false,
      menuItems,
      activeIndex: ''
    };
  },
  computed: {
    ...mapGetters({
      menuData: 'user/menuData'
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.warn(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.warn(key, keyPath);
    }
  },
  created() {
    if (this.$route.meta.type) {

      this.activeIndex = this.$route.meta.type[this.$route.params.id].id;
    }
    else {
      this.activeIndex = this.$route.meta.id;
    }
  },
  watch: {
    $route() {
      if (this.$route.meta.type) {
        this.activeIndex = this.$route.meta.type[this.$route.params.id].id;
      }
      else {
        this.activeIndex = this.$route.meta.id;
      }
    }
  }
};
</script>

<style lang="scss">
.menu {
  .el-menu-item-group__title {
    display: none;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #2b2f32;
  }
  .el-submenu__title,
  .el-tooltip,
  .el-menu-item {
    width: 201px;
  }
  .itemBox {
    background-color: #191d20;
    margin-bottom: 5px;
  }
}

.move-trigger {
  width: 64px;
  float: right;
  height: 40px;
  line-height: 40px;
  color: #fff;
  padding-top: 5px;
  cursor: pointer;
  text-align: center;
}
//不确定
.el-menu.el-menu--popup.el-menu--popup-right-start {
  background-color: #2b2f32;
}

.fa-icon {
  fill: currentColor;
}
</style>
