<template>
  <el-scrollbar wrap-class="scrollbar-wrapper menu">
    <el-menu :default-active="activeIndex" class="el-menu-vertical" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <!-- 遍历nav -->
      <template v-for="items in menuData">
        <template v-if="items.children && items.leaf">
          <el-submenu :index="items.id" :key="items.id" class="itemBox">
            <template slot="title">
              <svg class="myIconStyle" aria-hidden="true">
                <use :xlink:href="'#' + items.icon"></use>
              </svg>
              <span slot="title">{{items.name}}</span>
            </template>
            <!-- 递归 -->
            <Menu :menuData="items.children"></Menu>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item  v-if="items.showMenu!==false" :index="items.id" :key="items.id" @click.native="goPage(items)">
            <svg class="myIconStyle" aria-hidden="true">
              <use :xlink:href="'#' + items.icon"></use>
            </svg>
            <span slot="title">{{items.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="move-trigger" @click="isCollapse=!isCollapse">
      <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
      <i v-else class="el-icon-d-arrow-right"></i>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from './menu';

// import menuData from '../../../mock/menu.json';

export default {
  name: 'Sidebar',
  components: { Menu },
  computed: {
    ...mapGetters({
      menuData: 'user/menuData'
    })
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
  },
  data() {
    return {
      // menuData
      isCollapse: false,
      activeIndex: ''
    };
  },
  methods: {

  }
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler() {
  //       console.log(this.$route);
  //       if (this.$route.meta.type) {
  //         this.activeIndex(this.$route.meta.type[this.$route.params.id].id);
  //       } else {
  //         this.activeIndex(this.$route.meta.id);
  //       }
  //     }
  //   }
  // }
};
</script>
<style lang="scss">
.scrollbar-wrapper {
  height: 100%;
  overflow-x: hidden;
}
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
  .myIconStyle {
    width: 20px;
    height: 20px;
    fill: currentColor;
    overflow: hidden;
    color: #909399;
    margin-right: 5px;
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
