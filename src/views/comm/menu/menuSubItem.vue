<template>
  <el-submenu :index="item.code" >
    <template slot="title">
      <i v-if="item.icon" :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <el-menu-item-group>
      <slot></slot>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  name: 'menuSubItem',
  props: {
    item: {
      Object,
      default: {
        id: '',
        name: '',
        icon: ''
      }
    }
  }
};
</script>

<style scoped>
</style>
