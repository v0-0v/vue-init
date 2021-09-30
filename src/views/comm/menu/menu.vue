<template>
  <el-menu-item-group>
    <!-- 遍历nav -->
    <template v-for="items in menuData">
      <template v-if="items.children && items.leaf">
        <el-submenu :key="items.id" :index="items.code">
          <template slot="title">
            <i v-if="item.icon" :class="item.icon"></i>
            <span slot="title">{{items.name}}</span>
          </template>
          <!-- 递归 -->
          <Menu :menuData="items.children"></Menu>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item v-if="items.showMenu!==false" :index="items.code" :key="items.id" @click.native="goPage(items)">
          <i v-if="item.icon" :class="item.icon"></i>
          <span slot="title">{{items.name}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu-item-group>
</template>

<script>

export default {
  name: 'Menu',
  props: {
    menuData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    goPage(item) {
      // this.activeIndex(item.id);
      // this.$router.push(item.path);

      this.$router.push(item.path);
    }
  }
};
</script>

<style lang="scss">
.scrollbar-wrapper {
  height: 100%;
  overflow-x: hidden;
}
</style>
